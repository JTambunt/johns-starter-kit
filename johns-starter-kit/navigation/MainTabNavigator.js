import React from 'react';
import { Text, View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBarIcon } from '../components';
import { Colors } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import { headerConfig } from './RootNavigator';

const HomeStackNavigator = createStackNavigator();

function HomeStack() {
    return (
        <HomeStackNavigator.Navigator
            screenOptions={() => headerConfig}
            initialRouteName={'HomeScreen'}
        >
            <HomeStackNavigator.Screen
                name='HomeScreen'
                component={HomeScreen}
            />
        </HomeStackNavigator.Navigator>
    );
}

const SettingsStackNavigator = createStackNavigator();

function SettingsStack() {
    return (
        <SettingsStackNavigator.Navigator
            screenOptions={() => headerConfig}
            initialRouteName={'SettingsScreen'}
        >
            <SettingsStackNavigator.Screen
                name='SettingsScreen'
                component={SettingsScreen}
            />
            <SettingsStackNavigator.Screen
                name='CreatePostScreen'
                component={CreatePostScreen}
            />
        </SettingsStackNavigator.Navigator>
    );
}

const TabNavigator = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <TabNavigator.Navigator
            tabBarOptions={{
                style: {
                    backgroundColor: Colors.turkishSea,
                },
            }}
        >
            <TabNavigator.Screen
                name='HomeStack'
                component={HomeStack}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                fontSize: 16,
                                color: focused
                                    ? Colors.seaPink
                                    : Colors.tabIconDefault,
                                fontFamily: 'gilbert',
                            }}
                        >
                            Love!
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) =>
                        Platform.OS === 'web' ? (
                            <View />
                        ) : (
                            <TabBarIcon
                                focused={focused}
                                name={
                                    Platform.OS === 'ios'
                                        ? `ios-heart${focused ? '' : '-empty'}`
                                        : `md-heart${focused ? '' : '-empty'}`
                                }
                            />
                        ),
                }}
            />
            <TabNavigator.Screen
                name='SettingsStack'
                component={SettingsStack}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{
                                fontSize: 16,
                                color: focused
                                    ? Colors.seaPink
                                    : Colors.tabIconDefault,
                                fontFamily: 'gilbert',
                            }}
                        >
                            Settings
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) =>
                        Platform.OS === 'web' ? (
                            <View />
                        ) : (
                            <TabBarIcon
                                focused={focused}
                                name={
                                    Platform.OS === 'ios'
                                        ? 'ios-options'
                                        : 'md-options'
                                }
                            />
                        ),
                }}
            />
        </TabNavigator.Navigator>
    );
};

export default Tabs;
