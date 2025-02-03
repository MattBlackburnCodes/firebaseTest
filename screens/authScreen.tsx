import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { HelloWave } from '@/components/HelloWave';
import Logo from '../components/SigninLogo';


export default function AuthScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigation = useNavigation();

    const handleAuth = async () => {
        try {
            if (isLogin) {
                // Login user
                await signInWithEmailAndPassword(auth, email, password);
                Alert.alert('Success', 'You are logged in!');
                navigation.navigate('welcomeScreen');
            } else {
                // Signup user
                await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert('Success', 'Account created!');
                navigation.navigate('welcomeScreen');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error','Invalid email or password');
        }
    };

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Success', 'Password reset email sent!');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Invalid email');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Logo />
                <Text style={styles.title}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title={isLogin ? 'Log In' : 'Sign Up'} onPress={handleAuth} />
                <Button title="Reset Password" onPress={handleResetPassword} color="blue" />
                <Button
                    title={isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
                    onPress={() => setIsLogin(!isLogin)}
                    color="gray"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'black',

    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: 'white',
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'pink',
        borderRadius: 4,
        color: 'white',
    },
});
