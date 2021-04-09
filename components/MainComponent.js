import React, { Component } from "react";
import Directory from './DirectoryComponent';
import ServiceInfo from './ServiceInfoComponent';
// import Settings from './SettingsComponent';
import Chat from './ChatComponent';

import { View, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';


const TopTabNav = createMaterialTopTabNavigator(
    {
        Directory: {
            screen: Directory,
        },
        ServiceInfo: {
            screen: ServiceInfo,
        },
        Chat: {
            screen: Chat,
        },
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Directory') {
                    iconName = 'ios-home';
                } else if (routeName === 'Chat') {
                    iconName = 'ios-chatboxes';
                } else if (routeName === 'ServiceInfo') {
                    iconName = 'ios-chatboxes';
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={horizontal ? 20 : 25}
                        color={tintColor}
                    />
                    // icons not working
                );
            },

        }),
    },
);

const AppNavigator = createAppContainer(TopTabNav);

class Main extends Component {

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
            }}>
                <AppNavigator />
            </View>
        );
    }
}

export default Main;