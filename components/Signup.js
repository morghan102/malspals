import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
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
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [emergencyNum, setEmergencyNum] = useState('')



    const handleSignUp = () => {
        // if (password !== confirmPassword) {
        //     alert("Passwords don't match.")
        //     return
        // }

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log("res" + res);
                const uid = res.user.uid;
                const account = {
                    id: uid,
                    email,
                    fullName,
                    address,
                    emergencyNum,
                    phone
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef.doc(uid).set(account).then(() => {
                    navigation.navigate('App', { user: account })
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
            <View style={styles.logoBox}>
                <Image
                    style={styles.logo}
                    source={require('../assets/icon.png')}
                />
            </View>
            <TextInput
                style={styles.inputBox}
                value={fullName}
                onChangeText={fullName => setFullName(fullName)}
                placeholder='Full Name'
            />
            <TextInput
                style={styles.inputBox}
                value={address}
                onChangeText={address => setAddress(address)}
                placeholder='Address'
            />
            <TextInput
                style={styles.inputBox}
                value={phone}
                onChangeText={phone => setPhone(phone)}
                placeholder='Phone Number'
                autoCapitalize='none'
            />
            {/* <TextInput
                style={styles.inputBox}
                value={emergencyNum}
                onChangeText={num => setEmergencyNum(num)}
                placeholder='Emergency Number'
                autoCapitalize='none'
            /> */}
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={email => setEmail(email.trim())}
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
            {/* <TextInput
                style={styles.inputBox}
                value={confirmPassword}
                onChangeText={password => setConfirmPassword(password)}
                placeholder='Confirm Password'
                secureTextEntry={true}
            /> */}
            <TouchableOpacity style={styles.buttonAccept} onPress={() => handleSignUp()}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('Login')}>
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
        justifyContent: 'center',
        // borderWidth: 1
    },
    inputBox: {
        width: '85%',
        margin: 5,
        padding: 10,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    buttonAccept: {
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#557ABE',
        borderColor: '#557ABE',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonLogin: {
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#B980D4',
        borderColor: '#B980D4',
        borderWidth: 1,
        borderRadius: 5,
        width: 220
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        // lineHeight: 25
    },
    buttonSignup: {
        fontSize: 12
    },
    logoBox: {
        height: 150,
        width: 'auto',
        // borderWidth: 1
        marginBottom: 20
    },
    logo: {
        flex: 1,
        // height: 50,
        width: 170,
        alignSelf: "center",
        // margin: 30
    },
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