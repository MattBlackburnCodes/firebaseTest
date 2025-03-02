import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

export default function AdBanner() {
    return (
        <View style={styles.banner}>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" 
                servePersonalizedAds={true}
                onDidFailToReceiveAdWithError={(error) => console.error("AdMob Error:", error)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        marginTop: 20,
        alignItems: 'center',
    },
});
