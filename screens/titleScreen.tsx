import React from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TitleScreen() {
    const navigation = useNavigation();
    setTimeout(() => {
        navigation.navigate('authScreen');
    }, 3000);

    return (
        <View style={styles.container}>
            <Image 
                //source={require('../assets/images/Logo.png')} 
                style={styles.image} />
            <Text style={styles.title}>Quotify</Text>
            <ActivityIndicator size='large' color='white' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 40,
        padding: 40,
        backgroundColor: 'black',
        opacity: 0.8,
    },
    title: {
        fontSize: 20,
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