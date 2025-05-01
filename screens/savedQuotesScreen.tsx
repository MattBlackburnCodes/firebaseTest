import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import db, { auth } from "@/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import MenuButton from "@/components/MenuButton";

export default function SavedQuotesScreen() {
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser; // Get the current user

  useEffect(() => {
    fetchSavedQuotes();
  }, [user]); // Fetch quotes when user changes

  const fetchSavedQuotes = async () => {
    if (!user) return; // Ensure user is logged in

    try {
      const favoritesRef = collection(db, "users", user.uid, "favorites");
      const snapshot = await getDocs(favoritesRef);

      const quotesList = snapshot.docs.map((doc) => ({
        id: doc.id, // Quote ID
        ...doc.data(), // Quote details
      }));

      setSavedQuotes(quotesList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching saved quotes:", error);
      setLoading(false);
    }
  };

  const removeFavorite = async (quoteId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "favorites", quoteId));

      // Update state to remove deleted quote
      setSavedQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== quoteId));
    } catch (error) {
      console.error("Error removing quote:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  if (savedQuotes.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.titleGroup}>
            <Text style={styles.title}>Saved Quotes</Text>
            <MenuButton /> 
        </View>
        <Text style={styles.emptyText}>No saved quotes yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.titleGroup}>
            <Text style={styles.title}>Saved Quotes</Text>
            <MenuButton /> 
        </View>
        <FlatList
            data={savedQuotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.quoteContainer}>
                  <Text maxFontSizeMultiplier={1.3} style={styles.quoteText}>{item.quote}</Text>
                  <Text maxFontSizeMultiplier={1.3} style={styles.authorText}>- {item.author}</Text>
                  <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                      <MaterialIcons name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
            )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#121212",
    flexDirection: "column",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
    titleGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
        width: '80%',
        paddingTop: 10,
        zIndex: 1,
    },
  quoteContainer: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 0,
  },
  quoteText: {
    fontSize: 20,
    fontStyle: "italic",
    color: "white",
    flex: 1,
  },
  authorText: {
    fontSize: 16,
    color: "yellow",
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
