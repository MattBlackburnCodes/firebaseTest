import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function GoBack() {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
                <Text allowFontScaling={false} style={styles.buttonText}>Go Back</Text>
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
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});