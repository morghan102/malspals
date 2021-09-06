import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { firebase } from "../config/Firebase";

// this will look like campsiteinfo comp in numcapsite, postcomment

const mapStateToProps = state => {
    return {
    };
};



//navigation.setOptions could be useful here  https://reactnavigation.org/docs/navigation-prop/#setoptions
//for now login and signup navigate here in order to send user info here. I would like to change this

function ClientPetInfo(props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    useEffect(() => { //we call this the first time the app loads w useEffect
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => { //oASC returns curently logged in user
            // We then fetch all the extra user data that we stored in Firestore, and set it on the current component’s state.
            if (user) {
                usersRef.doc(user.uid).get().then((document) => {
                    const userData = document.data()
                    setLoading(false)
                    setUser(userData)
                })
                .catch((err) => {
                    setLoading(false)
                });
            } else {
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        console.log("loading from clientpet")
        return (
            <></>
        )
    }

    return (
        <View>
            {console.log(props)}
            <Text>Coming soon once the backend is set up</Text>
        </View>
    );
}

export default connect(mapStateToProps)(ClientPetInfo);