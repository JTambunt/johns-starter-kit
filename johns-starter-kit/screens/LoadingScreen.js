import React from 'react';
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Colors';

const splash = require('../assets/images/splash.png');

export default function LoadingScreen() {
    return (
        <View style={styles.screenContainer}>
            <Image source={splash} style={styles.imageContainer} />
            <View style={styles.loading}>
                <ActivityIndicator size='large' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.turkishSea,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        resizeMode: 'contain',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
