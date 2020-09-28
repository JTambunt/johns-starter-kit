import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
} from 'react-native';

import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { updateLogin, login } from '../ducks/UserSessionDuck';

class LoginScreen extends React.Component {
    _handleLogin = () => {
        this.props.login({
            email: this.props.email,
            password: this.props.password,
        });
    };

    render() {
        return (
            <SafeAreaView style={styles.containerSafeArea}>
                <View style={styles.container}>
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
                        onPress={this._handleLogin}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('SignupScreen')
                        }
                    >
                        <Text style={styles.signUpButtonText}>
                            Don't have an account yet? Sign up
                        </Text>
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
    signUpButtonText: {
        fontFamily: 'gilbert',
        fontSize: 20,
        color: Colors.turkishSea,
    },
});

const mapStateToProps = ({ userSession, firebase }) => {
    const { email, password, error, loading } = userSession;

    const { auth, profile } = firebase;

    return {
        email: email ? email : '',
        password: password ? password : '',
        error,
        loading,
        auth,
        profile,
    };
};

export default connect(mapStateToProps, {
    updateLogin,
    login,
})(LoginScreen);
