import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../components/SignupScreen';
import LoginScreen from '../components/FirebaseLoginScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Sceen
                name='Login'
                component={LoginScreen}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name='Signup'
                component={SignupScreen}
            />
        </Stack.Navigator>
    );
}
// the stack navigator adds a header to each screen inside it. 
// For the current stack, you are not going to require a header on the Login screen, this is set to null.