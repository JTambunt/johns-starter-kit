import React, { Component } from 'react';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import { store } from './store';
import RootNavigator from './navigation/RootNavigator';
import Firebase from './config/Firebase.js';

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const rrfProps = {
    firebase: Firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance: createFirestoreInstance,
};

export default class App extends Component {
    state = {
        isLoadingComplete: false,
        skipLoadingScreen: false,
    };

    render() {
        if (!this.state.isLoadingComplete) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <ReactReduxFirebaseProvider {...rrfProps}>
                        <RootNavigator />
                    </ReactReduxFirebaseProvider>
                </Provider>
            );
        }
    }

    async _loadResourcesAsync() {
        let imageAssets = [
            require('./assets/images/favicon.png'),
            require('./assets/images/icon.png'),
            require('./assets/images/splash.png'),
        ];

        const cacheImages = imageAssets.map((image) => {
            try {
                if (typeof image === 'string') {
                    return Image.prefetch(image);
                } else {
                    return Asset.fromModule(image).downloadAsync();
                }
            } catch (e) {
                console.log(e);
                return;
            }
        });

        await Font.loadAsync({
            ...Ionicons.font,
            gilbert: require('./assets/fonts/Gilbert-Bold.otf'),
            gilbertColor: require('./assets/fonts/Gilbert-Color-Bold.otf'),
        });

        return Promise.all([...cacheImages]);
    }

    _handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error reporting
        // service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}
