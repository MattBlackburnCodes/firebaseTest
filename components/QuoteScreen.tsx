import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Share } from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import db, { auth } from "@/firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ShareButton from "@/components/ShareButton";

export default function QuotesScreen() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const apiURL = "https://zenquotes.io/api/quotes";

  // 🔹 Listen for auth state changes (fixes auth.currentUser not updating)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup function
  }, []);

  // 🔹 Fetch a quote when the screen loads
  useEffect(() => {
    fetchQuote();
  }, []);

  // 🔹 Check if the quote is a favorite when `quote` or `user` changes
  useEffect(() => {
    if (quote && user) {
      checkIfFavorite(quote.q);
    }
  }, [quote, user]);

  const fetchQuote = () => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
        setQuote(randomQuote);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setLoading(false);
      });
  };

  const checkIfFavorite = async (quoteText) => {
    if (!user) return; // Prevents errors if user is not logged in

    try {
      const quoteRef = doc(db, "users", user.uid, "favorites", quoteText);
      const docSnap = await getDoc(quoteRef);
      setIsFavorite(docSnap.exists());
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!quote || !user) return; // Prevents errors if no user

    try {
      const favRef = doc(db, "users", user.uid, "favorites", quote.q);

      if (isFavorite) {
        await deleteDoc(favRef); // Remove from Firestore
      } else {
        await setDoc(favRef, {
          quote: quote.q,
          author: quote.a,
          timestamp: new Date(),
        });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error saving favorite quote:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="white" />;
  } else if (!quote) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Failed to load quote.</Text>
        <TouchableOpacity style={styles.button} onPress={fetchQuote}>
          <Text style={styles.buttonText}>Get New Quote</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.quotes}>
            <Text style={styles.quoteText}>{quote.q}</Text>
            <Text style={styles.authorText}>- {quote.a}</Text>
        </View>
        <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
                <MaterialIcons onPress={toggleFavorite} name="favorite" size={24} color={isFavorite ? "red" : "white"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={fetchQuote}>
                <FontAwesome5 name="quote-right" size={24} color="white" />
            </TouchableOpacity>
            <ShareButton style={styles.button} quote={quote} />
        </View> 
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 30,
        width: "100%",
        height: "80%",

            
    },
    quotes: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: .8,

        borderRadius: 10,   
    },
    button: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: 'lightpink',
        fontSize: 18,
    },
    loadingText: {
        fontSize: 18,
    },
    quoteText: {
        fontSize: 24,
        fontStyle: "italic",
        marginBottom: 10,
        textAlign: "center",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        padding: 10,
        opacity: 1,
    },
    authorText: {
        fontSize: 18,
        marginBottom: 20,
        color: "yellow",
        fontStyle: "italic",
    },
    buttonRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: "5%"
    },
});
