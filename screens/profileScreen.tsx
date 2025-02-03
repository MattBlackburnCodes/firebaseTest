import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Button } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import GoBack from "@/components/GoBack";
import { auth } from "@/firebaseConfig";
import db from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [userName, setUserName] = useState(""); // Stores fetched name
    const navigation = useNavigation();
    const user = auth.currentUser; // Get logged-in user

    // Fetch user's name when the screen loads
    useFocusEffect(() => {
        if (user) {
            fetchUser();
        }
    });


    const fetchUser = async () => {
        try {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                setUserName(docSnap.data().name); // Set name in state
            } else {
                console.log("No user data found");
            }
        } catch (error) {
            console.error("Error fetching user: ", error);
        }
    };

    // Save or update user profile
    const saveUser = async () => {
        if (!user) return;
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { name, age }, { merge: true });
            setUserName(name); // Update displayed name after saving
            console.log("User saved successfully!");
        } catch (error) {
            console.error("Error saving user: ", error);
        }
    };

    /*const handleSubmit = () => {
        saveUser();
        navigation.navigate("welcomeScreen", { data: username });
    }*/

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello, {userName || "Guest"}!</Text>
                <Text style={styles.title}>Profile</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="number-pad"
                />
                <Button title="Save Profile" onPress={saveUser} />
                <GoBack />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 40,
        padding: 40,
        backgroundColor: "black",
        opacity: 0.8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    input: {
        backgroundColor: "black",
        width: 200,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: "white",
        borderColor: "white",
        borderWidth: 1,
    },
});

