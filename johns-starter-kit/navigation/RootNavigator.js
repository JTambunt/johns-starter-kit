import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors, Typography } from '../constants';
import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DetailedPostScreen from '../screens/DetailedPostScreen';

const Stack = createStackNavigator();

const headerConfig = {
    headerStyle: {
        backgroundColor: Colors.limpetShell,
        shadowOpacity: 0,
    },
    headerTitleStyle: {
        ...Typography.h1,
    },
    headerBackTitleVisible: false,
    headerBackImage: () => (
        <MaterialCommunityIcons
            color={Colors.turkishSea}
            name='arrow-left'
            size={32}
            style={{ marginLeft: 8 }}
        />
    ),
};

class RootNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={() => headerConfig}>
                    {this.props.auth.uid ? (
                        <>
                            <Stack.Screen
                                name='MainTabNavigator'
                                component={MainTabNavigator}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Stack.Screen
                                name='DetailedPostScreen'
                                component={DetailedPostScreen}
                                options={{
                                    title: 'A Piece of Love',
                                    headerStyle: {
                                        backgroundColor: Colors.livingCoral,
                                    },
                                    headerTintColor: '#fff',
                                    headerTitleStyle: {
                                        fontFamily: 'gilbert',
                                        fontSize: 24,
                                        fontWeight: undefined,
                                    },
                                }}
                            />
                        </>
                    ) : this.props.auth.isLoaded && this.props.auth.isEmpty ? (
                        <>
                            <Stack.Screen
                                name='LoginScreen'
                                component={LoginScreen}
                                options={{
                                    title: `John's Starter Kit`,
                                }}
                            />
                            <Stack.Screen
                                name='SignupScreen'
                                component={SignupScreen}
                                options={{
                                    title: 'Signup',
                                }}
                            />
                        </>
                    ) : (
                        <Stack.Screen
                            name='LoadingScreen'
                            component={LoadingScreen}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = ({ firebase }) => {
    const { auth } = firebase;

    return {
        auth,
    };
};

export default connect(mapStateToProps, {})(RootNavigator);
