import React, { Component, useEffect, useState } from "react";
import Home from './HomeComponent';
import ServiceInfo from './ServiceInfoComponent';
import Chat from './ChatComponent';
import ClientPetInfo from "./ClientPetComponent";
import Login from "./Login";
import Signup from "./Signup";
// import AuthLoadingScreen from './AuthLoading';

import { View, Platform, ActivityIndicator, AsyncStorage, StatusBar, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
// import { createSwitchNavigator } from 'react-navigation'; disabled until true login works
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import { createStackNavigator } from "react-navigation-stack";

import { firebase } from "../config/Firebase";

import { connect } from 'react-redux';
import { fetchServices, fetchReviews, fetchClientImages, fetchPets } from '../redux/ActionCreators';

// const mapDispatchToProps = {
//     fetchReviews,
//     fetchServices,
//     fetchClientImages,
//     // fetchUsers,
//     fetchPets,
// };


const AppNav = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon
                            size={25}
                            name='ios-home'
                            type='ionicon'
                            color={tintColor}
                        />
                    </View>
                ),
                activeColor: '#C71585',
                inactiveColor: '#226557',
                barStyle: { backgroundColor: '#FFC0CB' },
            },
        },
        ServiceInfo: {
            screen: ServiceInfo,
            navigationOptions: {
                tabBarLabel: 'Services',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon
                            size={25}
                            name='bone'
                            type='material-community'
                            color={tintColor}
                        // ideas: name'bone' type='material-community'
                        // name='bathtub' type='font-awesome'
                        // name 'heart' type=fone-awesome
                        />
                    </View>
                ),
                activeColor: '#006400',
                inactiveColor: '#226557',
                barStyle: { backgroundColor: '#8FBC8F' },

            },
        },
        ClientPetInfo: {
            screen: ClientPetInfo,
            navigationOptions: {
                tabBarLabel: 'Your Pet',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon
                            size={25}
                            name='dog'
                            type='material-community'
                            color={tintColor}
                        />
                    </View>
                ),
                activeColor: '#006400',
                inactiveColor: '#226557',
                barStyle: { backgroundColor: '#8FBC8F' },

            },
        },
        Chat: {
            screen: Chat,
            navigationOptions: {
                tabBarLabel: 'Chat',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon
                            size={25}
                            name='ios-chatboxes'
                            type='ionicon'
                            color={tintColor}
                        />
                    </View>
                ),
                activeColor: '#4B0082',
                inactiveColor: '#226557',
                barStyle: { backgroundColor: '#B0C4DE' },
            },
        },
    },
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            pressColor: 'lightgray',
            style: {
                backgroundColor: 'white',
            },
            indicatorStyle: {
                backgroundColor: 'black',
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: true,
            showIcon: true,
        },
    },
);
// const AppNavigator = createAppContainer(TopTabNav);

// const AuthNav = createAppContainer(createSwitchNavigator(
const AuthNav = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        }
    },
    {
        initialRouteName: 'Login'
    }
)

const FullNav = createAppContainer(
    createSwitchNavigator(
        {
            AuthCheck: AuthCheck,
            App: AppNav,
            Auth: AuthNav,
        },
        {
            initialRouteName: 'AuthCheck',
        }
    )
);

function AuthCheck(props) {
    // console.log(props.screenProps.user) //not sure this is working?? v confused
    if (props.screenProps.user == null) {
        props.navigation.navigate('Auth')
    } else {
        props.navigation.navigate('App');
    }
    return null;
}


function Main() {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);


    useEffect(() => { //we call this the first time the app loads w useEffect
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => { //oASC returns curently logged in user
            // We then fetch all the extra user data that we stored in Firestore, and set it on the current component’s state.
            if (user) {
                usersRef.doc(user.uid).get().then((document) => {
                    const userData = document.data();
                    setLoading(false);
                    setUser(userData);
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
        console.log("loading from main")
        return (
            <></>
        )
    }

    //ignoring this for now bc i want to focus on the tutorial 9/1/21
    //*************************************************** */
    // useEffect((props) => { //in function components, useEffect is used. (componentDidMount() {} )is for class components
    //     this.props.fetchServices();
    //     this.props.fetchReviews();
    //     this.props.fetchClientImages();
    //     this.props.fetchPets();
    //     // this.props.fetchUsers();
    // })
    // **********************************************************8


    return (
        <View
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
                paddingBottom: Constants.statusBarHeight / 2
            }}>
            <FullNav screenProps={{ user: user }} />
            {/* {user ? (
                (<AppNavigator {...props} extraData={user} />)
                // (console.log('in appnav'))
            ) : (

                // <LoginNavigator {...props} extraData={user} /> //////// we'll try this thing below for now/>
                <View>
                    <Login {...props} extraData={user} />
                    <Signup />
                </View>
            )} */}
        </View>
    );
}


{/* <View
style={{
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight / 2
}}>
<NavigationContainer>
    <Stack.Navigator>
        {user ? (
            <Stack.Screen name="Home">
                {props => <Main {...props} extraData={user} />}
            </Stack.Screen>
        ) : (
            <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
            </>
        )}
    </Stack.Navigator>
</NavigationContainer>
</View> */}

export default Main;


// export default connect(null, mapDispatchToProps)(Main);
// where i got the toptabnav help
// https://jeffgukang.github.io/react-native-tutorial/docs/router-tutorial/02-react-navigation-tab/react-navigation-tab.html