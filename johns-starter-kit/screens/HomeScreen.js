import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { firestoreConnect } from 'react-redux-firebase';

import { updateUser } from '../ducks/UserSessionDuck';
import { updatePost, saveClickedPost } from '../ducks/PostsDuck';
import { PostItem } from '../components';
import Colors from '../constants/Colors';

class HomeScreen extends Component {
    state = {
        isFetching: false,
    };

    async componentDidMount() {
        // await this._registerForPushNotificationsAsync();
    }

    // _registerForPushNotificationsAsync = async () => {
    //     const { status: existingStatus } = await Permissions.getAsync(
    //         Permissions.NOTIFICATIONS
    //     );
    //     let finalStatus = existingStatus;

    //     // only ask if permissions have not already been determined, because
    //     // iOS won't necessarily prompt the user a second time.
    //     if (existingStatus !== 'granted') {
    //         // Android remote notification permissions are granted during the app
    //         // install, so this will only ask on iOS
    //         const { status } = await Permissions.askAsync(
    //             Permissions.NOTIFICATIONS
    //         );

    //         finalStatus = status;
    //     }

    //     // Get the token that uniquely identifies this device
    //     if (finalStatus !== 'undetermined') {
    //         let token = await Notifications.getExpoPushTokenAsync();
    //         if (token) {
    //             let newUser = {};
    //             newUser.expo_token = token;
    //             this.props.updateUser({
    //                 user: newUser,
    //             });
    //         }
    //     }
    // };

    _renderHeader = () => {
        return <View style={{ height: 8 }} />;
    };

    _renderListEmpty = () => {
        return <View>{/* <Text>empty tho</Text> */}</View>;
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.posts}
                    renderItem={({ item }) => {
                        return (
                            <PostItem
                                onPress={() => this._onPostItemPress(item)}
                                post={item}
                                updatePost={(ref, post) => {
                                    this.props.updatePost(ref, post);
                                }}
                                updateUser={(user) => {
                                    this.props.updateUser(user);
                                }}
                                onDetailPress={() => {
                                    this.props.saveClickedPost(item.id);
                                    this.props.navigation.navigate(
                                        'DetailedPostScreen'
                                    );
                                }}
                                isFirst={this.props.posts[0].id === item.id}
                            />
                        );
                    }}
                    backgroundColor={Colors.limpetShell}
                    keyExtractor={(item) => `${item.id}`}
                    refreshing={this.state.isFetching}
                    onRefresh={this._onRefresh}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}
                    ListEmptyComponent={this._renderListEmpty}
                    onScroll={this.handleScroll}
                    ref={(ref) => {
                        this._flatList = ref;
                    }}
                />
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                ></ScrollView>
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
        paddingTop: 30,
    },
});

const mapStateToProps = ({ firestore }) => {
    const { ordered } = firestore;

    return {
        posts: ordered.posts ? ordered.posts : [],
    };
};

export default compose(
    connect(mapStateToProps, {
        updateUser,
        updatePost,
        saveClickedPost,
    }),
    firestoreConnect((props) => [
        {
            collection: 'posts',
            orderBy: ['date', 'desc'],
        },
    ])
)(HomeScreen);
