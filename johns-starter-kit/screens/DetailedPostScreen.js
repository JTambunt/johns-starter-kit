import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Platform,
    TextInput,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { CommentItem } from '../components';
import { updateUser } from '../ducks/UserSessionDuck';
import { updatePost } from '../ducks/PostsDuck';
import { Colors } from '../constants';
import { db } from '../config/Firebase';

class DetailedPostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    _renderVerticalSeparator = () => {
        return <View style={{ height: 8 }} />;
    };

    render() {
        const { post } = this.props;

        if (post) {
            let date = moment.unix(post.date.seconds).format('MMM. D');

            let isLoved = false;

            if (post.loves) {
                const index = post.loves.findIndex((love) => {
                    return this.props.profile.uid === love.id;
                });

                if (index != -1) {
                    isLoved = true;
                }
            }

            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: Colors.blueDepths,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'stretch',
                            marginVertical: 24,
                            marginHorizontal: 24,
                            borderColor: Colors.white,
                            borderWidth: 2,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                this.setState({
                                    expanded: !this.state.expanded,
                                });
                            }}
                            activeOpacity={0.5}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    height: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: Colors.turkishSea,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'gilbert',
                                        fontSize: 24,
                                        color: Colors.white,
                                    }}
                                >
                                    {date}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{
                                height: 200,
                                backgroundColor: Colors.viridianGreen,
                                justifyContent: 'space-between',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    margin: 12,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <ScrollView>
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontFamily: 'gilbert',
                                            fontSize: 16,
                                            color: Colors.white,
                                            marginRight: 8,
                                        }}
                                    >
                                        {post.message}
                                    </Text>
                                </ScrollView>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (isLoved) {
                                            let updatedLoves = [...post.loves];

                                            updatedLoves = updatedLoves.filter(
                                                (item) =>
                                                    item.id !==
                                                    this.props.profile.uid
                                            );
                                            this.props.updatePost(
                                                {
                                                    collection: 'posts',
                                                    doc: post.id,
                                                },
                                                { loves: updatedLoves }
                                            );
                                            this.props.updateUser({
                                                user: {
                                                    loves: updatedLoves,
                                                },
                                            });
                                        } else {
                                            let updatedLoves = [];
                                            if (post.loves) {
                                                updatedLoves = [...post.loves];
                                            }
                                            updatedLoves.push(
                                                db
                                                    .collection('users')
                                                    .doc(this.props.profile.uid)
                                            );
                                            this.props.updatePost(
                                                {
                                                    collection: 'posts',
                                                    doc: post.id,
                                                },
                                                { loves: updatedLoves }
                                            );
                                            this.props.updateUser({
                                                user: {
                                                    loves: updatedLoves,
                                                },
                                            });
                                        }
                                    }}
                                >
                                    <Ionicons
                                        size={26}
                                        color={
                                            isLoved
                                                ? Colors.seaPink
                                                : Colors.white
                                        }
                                        name={
                                            Platform.OS === 'ios'
                                                ? `ios-heart${
                                                      isLoved ? '' : '-empty'
                                                  }`
                                                : `md-heart${
                                                      isLoved ? '' : '-empty'
                                                  }`
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    height: 30,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                    backgroundColor: Colors.livingCoral,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'gilbert',
                                        fontSize: 16,
                                        color: Colors.white,
                                    }}
                                >
                                    {post.loves && post.loves.length > 0
                                        ? `${post.loves.length} loves`
                                        : `no loves yet`}
                                </Text>
                                {post.comments && post.comments.length > 0 && (
                                    <Text
                                        style={{
                                            fontFamily: 'gilbert',
                                            fontSize: 16,
                                            color: Colors.white,
                                        }}
                                    >
                                        {`${post.comments.length}`} comments
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                    {post && post.comments && post.comments.length > 0 ? (
                        <FlatList
                            style={styles.flatListStyle}
                            data={post.comments ? post.comments : []}
                            renderItem={({ item }) => (
                                <CommentItem
                                    userName={item.userName}
                                    comment={item.comment}
                                    createdAt={item.createdAt}
                                />
                            )}
                            ListHeaderComponent={this._renderVerticalSeparator}
                            ListFooterComponent={this._renderVerticalSeparator}
                            ItemSeparatorComponent={
                                this._renderVerticalSeparator
                            }
                            keyExtractor={(item) => item}
                            onEndReachedThreshold={50}
                        />
                    ) : (
                        <View style={{ flex: 1 }} />
                    )}
                    <View>
                        <TextInput
                            placeholder={'Type a comment'}
                            placeholderTextColor={Colors.offWhite}
                            style={{
                                height: 40,
                                borderColor: Colors.white,
                                borderTopWidth: 2,
                                color: Colors.white,
                                fontFamily: 'gilbert',
                                fontSize: 16,
                                paddingLeft: 36,
                                paddingRight: 12,
                                backgroundColor: Colors.turkishSea,
                            }}
                            onChangeText={(text) => {
                                this.setState({ message: text });
                            }}
                            textAlignVertical='center'
                            value={this.state.message}
                            returnKeyLabel={'done'}
                            returnKeyType={'done'}
                            autoFocus
                            onSubmitEditing={() => {
                                const { post } = this.props;
                                const messageToAdd = `${
                                    this.state.message ? this.state.message : ''
                                }`;
                                if (
                                    messageToAdd !== undefined &&
                                    messageToAdd !== ''
                                ) {
                                    let updatedComments = [];
                                    if (post.loves) {
                                        updatedComments = [...post.comments];
                                    }
                                    updatedComments.push({
                                        userName: this.props.profile.userName,
                                        comment: messageToAdd,
                                        createdAt: Date.now(),
                                    });
                                    this.props.updatePost(
                                        {
                                            collection: 'posts',
                                            doc: post.id,
                                        },
                                        { comments: updatedComments }
                                    );
                                    this.setState({ message: '' });
                                }
                            }}
                        />
                        <KeyboardSpacer />
                    </View>
                </View>
            );
        } else {
            return <View style={styles.container}></View>;
        }
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
    flatListStyle: {
        flex: 1,
    },
});

const mapStateToProps = ({ firestore, firebase, posts }) => {
    const { data } = firestore;
    const { clickedPostId } = posts;
    const { profile } = firebase;
    return {
        post: data && data.clickedPost ? data.clickedPost : null,
        postId: clickedPostId,
        profile,
    };
};

export default compose(
    connect(mapStateToProps, {
        updateUser,
        updatePost,
    }),
    firestoreConnect((props) => [
        { collection: 'posts', doc: props.postId, storeAs: 'clickedPost' },
    ])
)(DetailedPostScreen);
