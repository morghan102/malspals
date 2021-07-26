import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddUserComponent from './AddUserComponent';
import UserComponent from './UserComponent';
import UserDetailComponent from './UserDetailComponent';


// this will look like campsiteinfo comp in numcapsite, postcomment

const Stack = createStackNavigator();

const mapStateToProps = state => {
    return {
    };
};

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#621FF7' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' }
            }}
        >
            <Stack.Screen
                name="AddUserComponent"
                component={AddUserComponent}
                options={{ title: 'Add User' }}
            />
            <Stack.Screen
                name="UserComponent"
                component={UserComponent}
                options={{ title: 'Users List' }}
            />            
            <Stack.Screen
                name="UserDetailComponent"
                component={UserDetailComponent}
                options={{ title: 'User Detail' }}
            />
        </Stack.Navigator>
    )
}


function ClientPetInfo(props) {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

export default connect(mapStateToProps)(ClientPetInfo);