import React, { Component } from "react";
import Constants from 'expo-constants';
import Home from './HomeComponent';
import ServiceInfo from './ServiceInfoComponent';
import Chat from './ChatComponent';
import ClientPetInfo from "./ClientPetComponent";
// import Login from "./LoginComponent";

import { View, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
// import { createSwitchNavigator } from 'react-navigation'; disabled until true login works
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';


import { connect } from 'react-redux';
import { fetchServices, fetchReviews, fetchClientImages, fetchPets, fetchUsers } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchReviews,
    fetchServices,
    fetchClientImages,
    fetchUsers,
    fetchPets,
};


const TopTabNav = createMaterialTopTabNavigator(
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

        // these 2 are diabled until the backend is connected

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

// i can incorporate this later when I have the login page working correctly
// const switchNavigator = createSwitchNavigator(
//     {
//       Login,
//       TopTabNav
//     },
//     {
//       initialRouteName: 'Login',
//     },
//   );


const AppNavigator = createAppContainer(TopTabNav);

class Main extends Component {

    componentDidMount() {
        this.props.fetchServices();
        this.props.fetchReviews();
        this.props.fetchClientImages();
        this.props.fetchPets();
        this.props.fetchUsers();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
                    paddingBottom: Constants.statusBarHeight / 2
                }}>
                <AppNavigator />
            </View>
        );
    }
}

export default connect(null, mapDispatchToProps)(Main);
// where i got the toptabnav help
// https://jeffgukang.github.io/react-native-tutorial/docs/router-tutorial/02-react-navigation-tab/react-navigation-tab.html