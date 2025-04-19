import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import InfoScreen from "@/screens/infoScreen";

export default function QuoteFetcher({ selectedCategory, onQuoteFetched }) {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const apiURL = "https://quote-api-xi.vercel.app/api/quotes";

  const navigation = useNavigation();
  
  const goToInfoScreen = () => {
    // Pass the quote to the InfoScreen
    const quote = quotes[currentIndex]; // Get the current quote
    navigation.navigate("infoScreen", { quote });
  }


  useEffect(() => {
    fetchQuotes();
  }, [selectedCategory]);

  const fetchQuotes = () => {
    setLoading(true);
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        if (data[selectedCategory]) {
          setQuotes(data[selectedCategory]);
          setCurrentIndex(0);
          onQuoteFetched(data[selectedCategory][0]); // First quote
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
        setLoading(false);
      });
  };

  // Navigate within cached quotes
  const navigateQuote = (direction) => {
    if (quotes.length === 0) return; // Prevent navigation if no quotes exist

    setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex;

        if (direction === "next") {
            newIndex = (prevIndex + 1) % quotes.length; // Wrap around to the start
            console.log(newIndex)
        } else if (direction === "previous") {
            newIndex = (prevIndex - 1 + quotes.length) % quotes.length; // Wrap around to the end
            console.log(newIndex)
        }

        onQuoteFetched(quotes[newIndex]); // Update displayed quote
        return newIndex;
    });
};


  // Fetch a completely new random quote
  const fetchRandomQuote = () => {
    setLoading(true);
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        if (data[selectedCategory]) {
          const randomIndex = Math.floor(Math.random() * data[selectedCategory].length);
          const randomQuote = data[selectedCategory][randomIndex];
          console.log(currentIndex)
          setQuotes((prevQuotes) => [...prevQuotes, randomQuote]); // Add to list
          setCurrentIndex(quotes.length); // Set index to the last quote
          console.log(currentIndex)
          onQuoteFetched(randomQuote);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="white" />;
  }

  if (quotes.length === 0) {
    return <Text style={styles.errorText}>No quotes found.</Text>;
  }

  return (
    <View style={styles.quotes}>
      <Text style={styles.quoteText}>{quotes[currentIndex].q}</Text>
      <View style={styles.authorTextContainer}>
        <Text style={styles.authorText}>{quotes[currentIndex].a}</Text>
        <TouchableOpacity style={styles.infoButton} onPress={goToInfoScreen}>
          <FontAwesome5 name="info" size={12} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigateQuote("previous")}>
          <Text style={styles.buttonText}>{"←"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchRandomQuote}>
          <Text style={styles.buttonText}>{'🎲'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateQuote("next")}>
          <Text style={styles.buttonText}>{"→"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    quotes: { 
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        height: "70%",
        gap: "7%"
    },
    quoteText: {
        fontSize: 24,
        fontStyle: "italic",
        textAlign: "center",
        color: "white",
        padding: 10,
    },
    authorTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "85%",
        paddingHorizontal: 20,
    },
    authorText: { 
        fontSize: 18, 
        color: "yellow", 
        fontStyle: "italic" 
    },
    errorText: { 
        color: "red", 
        fontSize: 16 
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        width: "100%",
    },
    button: {
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: "30%",
    },
    infoButton: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 50,
      width: "15%",
      alignItems: "center",
      
    },
    buttonText: { 
        color: "white",
        fontSize: 30,
        textAlign: "center",
    },
});
