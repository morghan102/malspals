import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '../database/firebaseDb';


// Create an AuthContext. Export it since it is going to provide the user’s state and other helper functions that are 
// necessary to perform authentication actions throughout the different app screens

export const AuthContext = createContext({});
// The Context API in Reactjs shares data that is considered global for a tree of React components. When you are creating a context, there is a requirement to pass a default value. The value is then used when a component does not have a matching Provider.

// The Provider allows the React components to subscribe to the context changes. 

// THIS IS WHAT I'LL USE FOR LAUNCHING USER INFO ON CLIENTPETINFOCOMP: This provider is going to allow the screen components to access the state of the current user in the application. 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); //why null?

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log(e);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.error(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};