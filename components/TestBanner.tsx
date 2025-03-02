import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default function TestBanner() {
    return (
        <View style={styles.banner}>
            <Text>Test Ad Banner</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        width: 350,
        height: 50,
        borderRadius: 5,
        color: 'black',
        display: 'flex',
        justifyContent: 'center',

    },
});