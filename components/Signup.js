import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Firebase, { db } from '../config/Firebase';
import firestore from '@react-native-firebase/firestore';

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    handleSignUp = () => {
        const { email, password } = this.state
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => { if (firestore().collection('Users')) { //if the collectuon exists
                firestore().collection('Users').add({//add a user document to the collection
                    name: this.state.name,
                    email: this.state.email
                })
                .then(() => {
                    console.log('user added to firestore db!');
                })
            }})
            .then(() => this.props.navigation.navigate('Profile'))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.container}> 
                <TextInput
                    style={styles.inputBox}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholder='Full Name'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        )
    }
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