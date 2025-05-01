import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import React from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native'; 


export default function NameLogo() {
let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    });

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='white' />
            </View>

        )
    }

    return (
        <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.title}>Quotify</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Pacifico_400Regular',
        fontSize: 44,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
})