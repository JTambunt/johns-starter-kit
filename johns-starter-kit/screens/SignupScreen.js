import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { updateLogin, signup } from '../ducks/UserSessionDuck';

class SignupScreen extends React.Component {
    state = {
        fullName: '',
        userName: '',
    };

    _handleSignUp = () => {
        this.props.signup({
            email: this.props.email,
            password: this.props.password,
            fullName: this.state.fullName,
            userName: this.state.userName,
        });
    };

    render() {
        return (
            <SafeAreaView style={styles.containerSafeArea}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.fullName}
                        onChangeText={(fullName) => this.setState({ fullName })}
                        placeholder='Full Name'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.state.userName}
                        onChangeText={(userName) => this.setState({ userName })}
                        placeholder='Username'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.props.email}
                        onChangeText={(email) =>
                            this.props.updateLogin({
                                email,
                                password: this.props.password,
                            })
                        }
                        placeholder='Email'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.inputBox}
                        value={this.props.password}
                        onChangeText={(password) =>
                            this.props.updateLogin({
                                email: this.props.email,
                                password,
                            })
                        }
                        placeholder='Password'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._handleSignUp}
                    >
                        <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    containerSafeArea: {
        flex: 1,
        backgroundColor: Colors.limpetShell,
    },
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

const mapStateToProps = ({ userSession }) => {
    const { email, password, error, loading } = userSession;

    return {
        email: email ? email : '',
        password: password ? password : '',
        error,
        loading,
    };
};

export default connect(mapStateToProps, {
    updateLogin,
    signup,
})(SignupScreen);
