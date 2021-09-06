
import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
// import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import Login from '../screens/Login'
import Signup from './Signup'
import Profile from './Profile'
import { firebase } from '../config/Firebase'


function Login({ navigation }) {
    // class Login extends React.Component {
    // state = {
    //     email: '',
    //     password: ''
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                // console.log(res);

                // navigation.navigate('Main')
                const uid = res.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef.doc(uid).get().then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist")
                        return;
                    }
                    const user = firestoreDocument.data()
                    navigation.navigate('ClientPetInfo', { user })
                })
                    .catch(err => {
                        alert(err)
                    });
            }) 
            .catch(error => alert(error))
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={email => setEmail( email )}
                placeholder='Email'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={password => setPassword( password )}
                placeholder='Password'
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button
                title="Don't have an account yet? Sign up"
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    )
}


// const LoginNavigator = createSwitchNavigator(
//     {
//         Login: {
//             screen: Login
//         },
//         Signup: {
//             screen: Signup
//         },
//         Profile: {
//             screen: Profile
//         }
//     },
//     {
//         initialRouteName: 'Login'
//     }
// )

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

export default Login;
//this will no longer be for the your pet screen 9.1.21
