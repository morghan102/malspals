
import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import Login from '../screens/Login'
import Signup from './Signup'
import Profile from './Profile'
import Firebase from '../config/Firebase'


function Login({ navigation }) {
    // class Login extends React.Component {
    // state = {
    //     email: '',
    //     password: ''
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {
        const { email, password } = this.state; //w switch to functional comp this has to change

        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('Profile')) //w switch to functional comp this has to change
            .catch(error => console.log(error))
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={email => setEmail({ email })}
                placeholder='Email'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={password => setPassword({ password })}
                placeholder='Password'
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}> 
            {/* onPress={() => onLoginPress()}>   thats what they have w funcional comp */}
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button
                title="Don't have an account yet? Sign up"
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    )
}


const LoginNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        Profile: {
            screen: Profile
        }
    },
    {
        initialRouteName: 'Login'
    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default createAppContainer(LoginNavigator);
//this will no longer be for the your pet screen 9.1.21
