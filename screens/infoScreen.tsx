import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GoBack from '../components/GoBack';


export default function InfoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { quote } = route.params; // Assuming you pass the quote as a parameter

    
    const handleWikiLink = () => {
        Linking.openURL(quote.link);
    };

    return(
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <GoBack/> 
            </View>
            <View style={styles.imageContain}>
                <Image source={{ uri: quote.image }} style={styles.image} />
            </View>
            <Text style={styles.textTitle}>{quote.a}</Text>
            <Text style={styles.text}>{quote.i} </Text>
            <TouchableOpacity onPress={handleWikiLink} style={{ marginTop: 20 }}>
                <Text style={{ color: 'lightblue', fontSize: 16, textDecorationLine: 'underline' }}>
                    Learn more about {quote.a}
                </Text>
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        textAlign: 'left',
        backgroundColor: 'black',
        opacity: 0.8,
        gap: 40,
        padding: 40,
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'left',
    },
    textTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    imageContain:{
        justifyContent: "center",
        alignItems: "center",   
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
})