import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import SignOut from "./SignOut";

export default function MenuButton() {

    const [ menuVisible, setMenuVisible ] = useState(false);
    const navigation = useNavigation();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }
    }

    return (
        
            <View style={styles.container}>
                
                <TouchableOpacity onPress={toggleMenu}>
                    <MaterialIcons name="menu" size={24} color="white" />
                </TouchableOpacity>
                
                {menuVisible && (
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => navigation.navigate("profileScreen")}>
                        <Text style={styles.menuItem}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("welcomeScreen")}>
                        <Text style={styles.menuItem}>Quotes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("savedQuotesScreen")}>
                        <Text style={styles.menuItem}>Saved Quotes</Text>
                    </TouchableOpacity>
                    <SignOut />
                </View>
                )}
                
            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        marginLeft: 10,
        width: '60%',
    },
    menu: {
        position: 'absolute',
        top: 25,
        left: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 5,
        padding: 10,
        width: '70%',
    },
    menuItem: {
        color: 'lightblue',
        fontSize: 16,
        paddingVertical: 5,
    },
    
});