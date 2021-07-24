import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class UserDetailComponent extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button 
                    title="Users List"
                    onPress={() => this.props.navigation.navigate('EditUsersScreen')}
                    color="#19AC52"
                />
            </View>
        );
    }
}

export default UserDetailComponent;