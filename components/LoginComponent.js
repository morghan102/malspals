import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login'
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            // sia saves that info to the ss
            SecureStore.setItemAsync(
                // key
                'userinfo',
                // value. has to be a str
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
                // sia spits out an error if the k/v can't be stored, so we cathc it here
            ).catch(error => console.log('Could not save user info', error));
        } else { 
            SecureStore.deleteItemAsync('userinfo').catch(// deletes anythng under that key
                // the catch is for if theres an error to doing that
                error => console.log('Could not delete user info', error)
            );
        }
    }
// ensures the info is retrueved from the secStore when the comp mounts
    componentDidMount() {
        // checks if any data is stored under that key
        // returns promise, if resolves, returns val for that key
        SecureStore.getItemAsync('userinfo')
            .then(userdata => {
                // parse turns it back to a js object
                const userinfo = JSON.parse(userdata);
                // check to make sure its not nul and truthy
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}
                    // the val set up like this makes it controlled
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        // color='#5637DD'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default Login;