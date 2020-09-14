import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';

import Colors from '../constants/Colors';

import { connect } from 'react-redux';
import { createPost } from '../ducks/PostsDuck';

class CreatePostScreen extends React.Component {
    state = {
        message: '',
    };

    _handleSubmit = () => {
        this.props.createPost({
            message: this.state.message,
            loves: [],
            comments: [],
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.message}
                    onChangeText={(message) => this.setState({ message })}
                    placeholder='Message'
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._handleSubmit}
                >
                    <Text style={styles.buttonText}>Create Post</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

CreatePostScreen.navigationOptions = {
    title: 'Create Post',
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
        backgroundColor: Colors.limpetShell,
        alignItems: 'center',
        paddingTop: 30,
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 18,
        borderColor: Colors.turkishSea,
        borderBottomWidth: 1,
        textAlign: 'center',
        fontFamily: 'gilbert',
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: Colors.livingCoral,
        borderColor: Colors.livingCoral,
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'gilbert',
        color: '#fff',
    },
});

const mapStateToProps = ({ posts }) => {
    const { createPostSuccess, error, loading } = posts;

    return {
        createPostSuccess,
        error,
        loading,
    };
};

export default connect(mapStateToProps, {
    createPost,
})(CreatePostScreen);
