import React from "react";
import { View, Text, StyleSheet, Button} from 'react-native';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import * as firebase from 'firebase'; // idk if i want these here...
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const auth = firebase.auth();
const firestore = firebase.firestore();



function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    return (
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
    );
}

function SignOut() {
    return auth.currentUser && (
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
    )
}

function Chatroom() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, {idField: 'id'});

    return (
        <View>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </View>
    );
}

function ChatMessage(props) {
    const { text, uid } = props.message;

    return <View>{text}</View>
}


function Chat(props) {
    const [user] = useAuthState(auth);

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerText}>

                </Text>
            </View>
            <View style={styles.chatContainer}>
                {/* I might be abe to do this from navugation so that the entire tab redirects to signin page */}
                {user ? <Chatroom /> : <SignIn />}
            </View>
        </View>
    );
}
export default Chat;

const styles = StyleSheet.create({
    header: {

    },
})