import React, { Component } from "react";
import Directory from './DirectoryComponent';
import ServiceInfo from './ServiceInfoComponent';
// import Settings from './SettingsComponent';
import Chat from './ChatComponent';

import { View, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TopTabNav = createMaterialTopTabNavigator(
    {
        Directory: {
            screen: Directory,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
                    </View>
                ),
                initialRouteName: 'Home',
                activeColor: '#C71585',
                inactiveColor: '#226557',
                barStyle: { backgroundColor: '#FFC0CB' },
            },
        },
        ServiceInfo: {
            screen: ServiceInfo,
            navigationOptions: {
                tabBarLabel: 'Service Info',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <MaterialCommunityIcons
                            style={[{ color: tintColor }]}
                            size={25}
                            name={'dog'}
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
                            style={[{ color: tintColor }]}
                            size={25}
                            name={'ios-chatboxes'}
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
// where i got the toptabnav help
// https://jeffgukang.github.io/react-native-tutorial/docs/router-tutorial/02-react-navigation-tab/react-navigation-tab.html