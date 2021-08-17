
import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Firebase from '../config/Firebase'

import { bindActionCreators } from 'redux'; //The bindActionCreators maps actions to an object using the names of the action functions. These functions automatically dispatch the action to the store when the function is invoked. To change the data, we need to dispatch an action.
import { connect } from 'react-redux'; //To enable this, we need two things: mapStateToProps and mapDispatchToProps, and we need to connect both of them with our component. This connection is done by using the connect() method from the react-redux package. 
import { updateEmail, updatePassword, signup } from '../redux/user'; //We define these two functions and modify the export default statement after we define the styles in this component file.



//the 2 below methods and the connect func at the bottom might need to be moved to the redux foder/main component where they belong... idk
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch)
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}


class Signup extends React.Component { //i can change that syntax
    // state = {
    //     name: '',
    //     email: '',
    //     password: ''
    // }

    handleSignUp = () => {
        // const { email, password } = this.state;
        // Firebase.auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then(() => this.props.navigation.navigate('Profile'))
        //     .catch(error => console.log(error))
        this.props.signup();
        this.props.navigation.navigate('Profile');
    }


    render() {
        return (
            <View style={styles.container}>
                {/* <TextInput
                    style={styles.inputBox}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholder='Full Name'
                /> */}
                <TextInput
                    style={styles.inputBox}
                    value={this.props.user.email}
                    onChangeText={email => this.props.updateEmail({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.props.user.password}
                    onChangeText={password => this.props.updatePassword({ password })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);