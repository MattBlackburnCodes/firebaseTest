import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";

export default function QuotesScreen() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiURL = "https://zenquotes.io/api/quotes";

  useEffect(() => {
    fetchQuote(); // Fetch a quote when the screen loads
  }, []);

  const fetchQuote = () => {
    setLoading(true);
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

  if (loading) {
    return <ActivityIndicator size="large" color="white" />;
  }
  else if (!quote) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Failed to load quote.</Text>
        <TouchableOpacity style={styles.button} onPress={fetchQuote}>
            <Text style={styles.buttonText}>Get New Quote </Text>
        </TouchableOpacity> 
      </View>
    );
  }

  //Displays the quote, author, and a button to fetch a new quote from the api
  return (
    <View style={styles.container}>
        <View style={styles.quotes}>
            <Text style={styles.quoteText}>{quote.q}</Text>
            <Text style={styles.authorText}>- {quote.a}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={fetchQuote}>
            <Text style={styles.buttonText}>Get New Quote </Text>
        </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        padding: 30,
        width: "150%",
        height: "150%",
            
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
});
