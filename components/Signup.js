import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { firebase } from '../config/Firebase';
import { AppNavigator } from './MainComponent';
// import firestore from '@react-native-firebase/firestore'; //this is an issue
// import Reactfrom 'react';



// function something(props) {
//     const [entityText, setEntityText] = useState('');
//     const [entities, setEntities] = useState('');

//     const entityRef = firebase.firestore().collection('entities');
//     const userId = props.user.id; //??? i need to set this. what will be passed down through props and jow?

// }



function Signup({ navigation }) {
        // state = {
        //     name: '',
        //     email: '',
        //     password: ''
        // }

        const [fullName, setFullName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [confirmPassword, setConfirmPassword] = useState('')


        const handleSignUp = () => {
            if (password !== confirmPassword) {
                alert("Passwords don't match.")
                return
            }

            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log("res" + res);
                    const uid = res.user.uid;
                    const account = {
                        id: uid,
                        email,
                        fullName,
                    };
                    const usersRef = firebase.firestore().collection('users')
                    usersRef.doc(uid).set(account).then(() => {
                        navigation.navigate('ClientPetInfo', { user: account }) //this naviagtion isnt working
                        console.log(account)

                    })
                        .catch((error) => {
                            alert(error)
                        });
                })
                //     if (firestore().collection('Users')) { //if the collectuon exists
                //         firestore().collection('Users').add({//add a user document to the collection
                //             name: this.state.name,
                //             email: this.state.email
                //         })
                //             .then(() => {
                //                 console.log('user added to firestore db!');
                //             })
                //     }
                // })
                // .then(() => navigation.navigate('Profile'))
                .catch(error => {
                    alert(error)
                });
        }

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={fullName}
                    onChangeText={fullName => setFullName(fullName)}
                    placeholder='Full Name'
                />
                <TextInput
                    style={styles.inputBox}
                    value={email}
                    onChangeText={email => setEmail(email)}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputBox}
                    value={confirmPassword}
                    onChangeText={password => setConfirmPassword(password)}
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        );
    }

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
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
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



//the 2 below methods and the connect func at the bottom might need to be moved to the redux foder/main component where they belong... idk
// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({ signup }, dispatch)
//     //removed updateemail and updatePassword from the bindactionCreators
// }
// const mapStateToProps = state => {
//     return {
//         user: state.user
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);
export default Signup;