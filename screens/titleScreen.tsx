import React from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NameLogo from '../components/NameLogo';

export default function TitleScreen() {
    const navigation = useNavigation();
    setTimeout(() => {
        navigation.navigate('authScreen');
    }, 3000);

   

    return (
        <View style={styles.container}>
            <NameLogo />
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
        backgroundColor: 'black',
        opacity: 0.8,
        gap: 40,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
})