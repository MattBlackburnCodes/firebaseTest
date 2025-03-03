import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NameLogo from './NameLogo';
import {useFonts, Pacifico_400Regular} from '@expo-google-fonts/pacifico';

export default function Logo(){
    return (
        <View style={styles.containerTitle}>
            <NameLogo/>
            <Text style={styles.headline}>Inspiring Minds Daily</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    containerTitle: {
        marginTop: 100,
        height: 100,
        width: 200,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        color: 'white',
    },
    headline: {
        fontSize: 15,
        marginBottom: 16,
        color: 'white',
        
    },
});
