import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function QuoteNavigator({ direction, onNavigate }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onNavigate(direction)}>
      <FontAwesome5
        name={direction === "next" ? "arrow-right" : "arrow-left"}
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});
