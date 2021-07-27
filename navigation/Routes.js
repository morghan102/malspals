import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import MainComponent from './MainComponent';
import { AuthContext } from './AuthProvider';
import Loading from '../components/LoadingComponent';
import firebase from '../database/firebaseDb';


export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    // handles user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged); //i dont get what this is doing
        return subscriber; //this unsubscribes on unmount
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {user ? <MainComponent /> : <AuthStack />}
        </NavigationContainer>
    );
}