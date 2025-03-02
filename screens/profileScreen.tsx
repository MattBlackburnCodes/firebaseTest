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
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState(""); // Stores fetched name
    const [userAge, setUserAge] = useState(""); // Stores fetched age
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
                setUserName(docSnap.data().name || "Guest"); // Set name in state
                setUserAge(docSnap.data().age || "NA");// Set age in state
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
            const newUserData = {
                name: name.trim() !== "" ? name : userName,
                age: age.trim() !== "" ? age : userAge,
            }
            await setDoc(userRef, newUserData, { merge: true });
            setUserName(newUserData.name); // Update displayed name after saving
            setUserAge(newUserData.age); // Update displayed age after saving
            setName(""); // Clear input field
            setAge(""); // Clear input field
            console.log("User saved successfully!");
        } catch (error) {
            console.error("Error saving user: ", error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Hello, {userName || "Guest"}!</Text>
                <Text style={styles.title}>Profile</Text>
                <View style={styles.mainPage}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.title}>Name: {userName || "Guest"}</Text>
                        <Text style={styles.title}>Age: {userAge || "N/A"}</Text>
                    </View>
                    <View style={styles.rightContainer}>
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
                        </View>
                </View>
                <Button title="Save Profile" onPress={saveUser} />
                <GoBack />
            </View>
        </TouchableWithoutFeedback>
    );
}

/*
<TextInput
                            style={styles.input}
                            placeholder="Enter Your Age"
                            value={age}
                            onChangeText={setAge}
                            keyboardType="number-pad"
                        />

                        <Text style={styles.title}>Age: {userAge || "N/A"}</Text>
*/

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
        width: 100,
        height: 40,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: "white",
        borderColor: "white",
        borderWidth: 1,
    },
    mainPage: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 40,
        padding: 10,
    },
    leftContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 40,
    },
    rightContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
});

