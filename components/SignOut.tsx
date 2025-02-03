import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react';

export default function SignOut() {
    const auth = getAuth();

    const navigation = useNavigation();

    const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully!");
            navigation.navigate('authScreen');
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        marginLeft: 10,
    },
    button: {
        color: 'white',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
});