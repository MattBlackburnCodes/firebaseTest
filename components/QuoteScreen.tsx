import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Share, TouchableOpacity} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import db, { auth } from "@/firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ShareButton from "@/components/ShareButton";
import DropDownPicker from 'react-native-dropdown-picker';
import AdBanner from "@/components/AdBanner";
import TestBanner from "@/components/TestBanner";
import QuoteFetcher from "./QuoteFetcher";


export default function QuotesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("randomQuotes");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const apiURL = "https://quote-api-xi.vercel.app/api/quotes";

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
  }, [selectedCategory]);

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
        if (data[selectedCategory]){
          const randomIndex = Math.floor(Math.random() * data[selectedCategory].length);
          const randomQuote = data[selectedCategory][randomIndex];
          setQuote(randomQuote);
        }
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
        <TouchableOpacity style={styles.button} onPress={QuoteFetcher}>
          <Text style={styles.buttonText}>Get New Quote</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text allowFontScaling={false} style={styles.pickerTitle}>Categories</Text>
        <DropDownPicker
            open={open}
            value={selectedCategory}
            items={[
                {label: 'Random Quotes', value: 'randomQuotes'},
                {label: 'Black History Quotes', value: 'blackHistoryQuotes'},
                {label: 'Motivational Quotes', value: 'motivationalQuotes'},
                {label: 'Funny Quotes', value: 'funnyQuotes'},
                {label: 'Affirmation Quotes', value: 'affirmations'},
            ]}
            setOpen={setOpen}
            setValue={setSelectedCategory} 
            style={styles.pickerSelection}
        />
      </View>
      <QuoteFetcher selectedCategory={selectedCategory} onQuoteFetched={setQuote} /> 
        <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={toggleFavorite}>
                <MaterialIcons onPress={toggleFavorite} name="favorite" size={24} color={isFavorite ? "red" : "white"} />
            </TouchableOpacity>
            
            <ShareButton style={styles.button} quote={quote} />
        </View> 
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 0,
        width: "100%",
    },

    banner: {
        position: "absolute",
        bottom: 0,
    },
    pickerContainer: {
        width: "60%",
        height: 20,
        flex: 1,
        alignItems: "flex-start",
        flexDirection: "row",
        gap: 10,
        zIndex: 1,
        
    },
    pickerTitle:{
        color: "white",
        fontSize: 18,
        borderColor: "white",
        textAlign: "center",
      },
    pickerSelection: {
        justifyContent: "center",
        alignItems: "center",        
    },
    quotes: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        flex: 5,
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
        width: "100%",
        gap: "5%"
    },
});
