import React, { Component } from "react";
import Home from './HomeComponent';
import ServiceInfo from './ServiceInfoComponent';
// import Settings from './SettingsComponent';
import Chat from './ChatComponent';
import ClientPetInfo from "./ClientPetComponent";
import RequestService from './RequestService';

import { View, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { fetchServices, fetchReviews, fetchClientImages } from '../redux/ActionCreators';

const mapDispatchToProps = {
    fetchReviews,
    fetchServices,
    fetchClientImages
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
            // screen: ServicesNavigator,
            screen: ServiceInfo,
            navigationOptions: {
                tabBarLabel: 'Services',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon
                            size={25}
                            name='bathtub'
                            type='font-awesome'
                            color={tintColor}
                            // ideas: name'bone' type='material-community'
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

const ServicesNavigator = createStackNavigator(
    { 
        ServiceInfo: { 
            screen: ServiceInfo 
        },
        RequestService: { screen: RequestService }
    }, 
    {
        initialRouteName: 'ServiceInfo'
// i want to remove the header from the stack but cant figure it out :/

        // headerMode: false,
        // headerMode: none,
        //     headerTintColor: '#fff',
        //     headerTitleStyle: {
        //         color: '#fff'
        //     }
        // }
    }
);


const AppNavigator = createAppContainer(TopTabNav);

class Main extends Component {

    componentDidMount() {
        this.props.fetchServices();
        this.props.fetchReviews();
        this.props.fetchClientImages();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                    paddingBottom: Expo.Constants.statusBarHeight/2
                }}>
                <AppNavigator />
            </View>
        );
    }
}

export default connect(null, mapDispatchToProps)(Main);
// where i got the toptabnav help
// https://jeffgukang.github.io/react-native-tutorial/docs/router-tutorial/02-react-navigation-tab/react-navigation-tab.html