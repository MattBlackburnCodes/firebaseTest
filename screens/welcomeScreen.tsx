import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Flatlist, Button, ImageBackground } from 'react-native';
import QuoteScreen from '@/components/QuoteScreen';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
//import backgroundImage from '@/assets/images/serene.png';
import SignOut from '@/components/SignOut'
import ProfileButton from '@/components/ProfileButton';
import MenuButton from '@/components/MenuButton';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { auth } from "@/firebaseConfig";
import db from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
 
export default function HomeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const user = auth.currentUser; // Get logged-in user
    const [userName, setUserName] = useState('');

    useFocusEffect(() => {
            if (user) {
                fetchUser();
            }
    });

    const fetchUser = async () => {
        try {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);
            console.log(docSnap.data());

            if (docSnap.exists()) {
                setUserName(docSnap.data().name); // Set name in state
            } else {
                console.log("No user data found");
            }
        } catch (error) {
            console.error("Error fetching user: ", error);
        }
    };

    return (
        <ImageBackground 
            //source={backgroundImage}
            style={styles.container}
        >
            <View style={styles.backgroundContainer}>
            
                <View style={styles.titleGroup}> 
                    <View style={styles.titleLeft}>
                        <Text style={styles.title}>Quotify</Text>       
                        <Text style={styles.text}>Welcome, {userName || 'Guest'}!</Text>
                    </View>
                    <View style={styles.menu}>
                        <MenuButton/>
                    </View>
                </View>
                <View style={styles.title}>
                    
                </View>
                <QuoteScreen/>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        gap: 10,
        backgroundColor: 'black',
        
    },

    backgroundContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 20,
        borderRadius: 10,
        paddingTop: 100,
        height: '90%',

        
    },
    text: {
        fontSize: 16,
        color: 'lightblue',
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        color: 'lightblue',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    titleLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 10,
    },
    slogan: {
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'lightblue',
    },
    titleGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        gap: 10,
        marginTop: 0,
        width: '90%',
        
    },
    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        fontSize: 10,
    }
})