import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { PostItem } from '../components/common';
import Colors from '../constants/Colors';

class SecondFeedScreen extends Component {
    state = {
        isFetching: false,
    };

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
                    data={this.props.things}
                    renderItem={({ item }) => {
                        return (
                            <PostItem
                                onPress={() => this._onPostItemPress(item)}
                                post={item}
                            />
                        );
                    }}
                    backgroundColor={Colors.viridianGreen}
                    keyExtractor={(item) => `${item.date.seconds}`}
                    refreshing={this.state.isFetching}
                    onRefresh={this._onRefresh}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator} />
                    )}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={() => (
                        <View style={styles.separator} />
                    )}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}
                    ListEmptyComponent={this._renderListEmpty}
                    onScroll={this.handleScroll}
                    ref={(ref) => {
                        this._flatList = ref;
                    }}
                />
            </View>
        );
    }
}

SecondFeedScreen.navigationOptions = {
    title: 'Second Tab',
    headerStyle: {
        backgroundColor: Colors.livingCoral,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontFamily: 'gilbert',
        fontSize: 24,
        fontWeight: undefined,
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.viridianGreen,
    },
    contentContainer: {
        paddingTop: 30,
    },
    separator: {
        height: 1,
        marginLeft: 48,
        flex: 1,
        backgroundColor: Colors.white,
    },
});

const mapStateToProps = ({ userSession, things, firestore }) => {
    const { user, authenticated } = userSession;

    const { loading, thingsFeed } = things;

    const { ordered } = firestore;

    return {
        loading,
        authenticated,
        user,
        thingsFeed,
        things: ordered.things ? ordered.things : [],
    };
};

export default compose(
    connect(mapStateToProps, {}),
    firestoreConnect((props) => [
        {
            collection: 'things',
            orderBy: ['date', 'desc'],
        },
    ])
)(SecondFeedScreen);
