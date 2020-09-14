import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import Colors from '../../constants/Colors';
import { db } from '../../config/Firebase';

class PostItem extends Component {
    state = {
        expanded: false,
        isFirstOpened: true,
    };
    componentDidMount() {}

    render() {
        let post = this.props.post;

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
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    marginVertical: 8,
                    marginHorizontal: 24,
                }}
            >
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        if (this.props.isFirst) {
                            this.setState({
                                isFirstOpened: !this.state.isFirstOpened,
                            });
                        } else {
                            this.setState({
                                expanded: !this.state.expanded,
                            });
                        }
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
                {(this.props.isFirst && this.state.isFirstOpened) ||
                this.state.expanded ? (
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
                                            user: { loves: updatedLoves },
                                        });
                                    } else {
                                        let updatedLoves = [];
                                        if (post.loves) {
                                            updatedLoves = [...post.loves];
                                        } else {
                                            console.log(
                                                'loves array does not exists'
                                            );
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
                                            user: { loves: updatedLoves },
                                        });
                                    }
                                }}
                            >
                                <Ionicons
                                    size={26}
                                    color={
                                        isLoved ? Colors.seaPink : Colors.white
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
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                this.props.onDetailPress();
                            }}
                        >
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
                                    {this.props.post.loves &&
                                    this.props.post.loves.length > 0
                                        ? `${this.props.post.loves.length} loves`
                                        : `no loves yet`}
                                </Text>
                                {this.props.post.comments &&
                                this.props.post.comments.length > 0 ? (
                                    <Text
                                        style={{
                                            fontFamily: 'gilbert',
                                            fontSize: 16,
                                            color: Colors.white,
                                        }}
                                    >
                                        {`${this.props.post.comments.length}`}{' '}
                                        comments
                                    </Text>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        );
    }
}

const mapStateToProps = ({ userSession, firebase }) => {
    const { user } = userSession;

    const { auth, profile } = firebase;

    return {
        user,
        auth,
        profile,
    };
};

export default connect(mapStateToProps, {})(PostItem);
