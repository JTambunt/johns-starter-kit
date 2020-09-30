import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
} from 'react-native';
import Colors from '../constants/Colors';
import { firestoreConnect } from 'react-redux-firebase';

class SettingsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    {this.props.profile && !this.props.profile.isEmpty && (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'CreatePostScreen'
                                );
                            }}
                        >
                            <View
                                style={{
                                    height: 50,
                                    flex: 1,
                                    marginHorizontal: 24,
                                    backgroundColor: Colors.turkishSea,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <Text style={styles.subtitle}>Create Post</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => {
                            this.props.firebase.logout();
                        }}
                    >
                        <View
                            style={{
                                height: 50,
                                flex: 1,
                                marginHorizontal: 24,
                                backgroundColor: Colors.turkishSea,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={styles.subtitle}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.limpetShell,
    },
    contentContainer: {
        paddingTop: 16,
    },
    subtitle: {
        fontFamily: 'gilbert',
        fontSize: 24,
        color: Colors.white,
    },
});

const mapStateToProps = ({ firebase }) => {
    const { auth, profile } = firebase;

    return {
        auth,
        profile,
    };
};

export default compose(
    connect(mapStateToProps, {}),
    firestoreConnect()
)(SettingsScreen);
