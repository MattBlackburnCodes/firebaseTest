import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileButton() {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.navigate('profileScreen');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                <Text allowFontScaling={false} style={styles.buttonText}>Profile</Text>
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