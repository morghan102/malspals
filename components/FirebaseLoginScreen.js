// This screen component is going to be the initial route when the user is not authenticated or authorized to enter the app. 
// It is going to ask for the user’s credentials to enter the app and view the home screen or any other screens that are only 
// allowed for the user to interact with when they are authorized to do so.

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from './FormButton';
import FormInput from './FormInput';
import { AuthContext } from '../navigation/AuthProvider';
import firebase from '../database/firebaseDb';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to MalsPals!</Text>
            <FormInput
                value={email}
                placeholderText='Email'
                onChangeText={userEmail => setEmail(userEmail)}
                autoCapitalize='none'
                keyboardType='email-address'
                autoCorrect={false}
            />
            <FormInput
                value={password}
                placeholderText='Password'
                onChangeText={userPassword => setPassword(userPassword)}
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle='Login'
                onPress={() => login(email, password)}
            />
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text style={styles.navButtonText}>New User? Join here</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    },
    navButton: {
        marginTop: 15
    },
    navButtonText: {
        fontSize: 20,
        color: '#6646ee'
    }
});