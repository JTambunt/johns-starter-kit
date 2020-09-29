import Firebase, { db } from '../config/Firebase.js';

// ------------------------------------ TYPES ------------------------------------
export const types = {
    UPDATE_LOGIN: 'UPDATE_LOGIN',
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    SIGNUP: 'SIGNUP',
    SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
    SIGNUP_FAIL: 'SIGNUP_FAIL',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
};

// ------------------------------------ REDUCER ------------------------------------
const INITIAL_STATE = {
    email: null,
    password: null,
    user: null,
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.UPDATE_LOGIN:
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
            };
        case types.LOGIN:
            return {
                ...state,
                loading: true,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.SIGNUP:
            return {
                ...state,
                loading: true,
            };
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.UPDATE_USER:
            return {
                ...state,
                loading: true,
            };
        case types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.UPDATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// ------------------------------------ ACTIONS ------------------------------------
export const updateLogin = ({ email, password }) => {
    return (dispatch) => {
        dispatch({
            type: types.UPDATE_LOGIN,
            payload: {
                email,
                password,
            },
        });
    };
};

export const login = ({ email, password }) => {
    return (dispatch) => {
        try {
            dispatch({ type: types.LOGIN });

            const response = Firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(
                    function (result) {
                        dispatch({
                            type: types.LOGIN_SUCCESS,
                            payload: result.user,
                        });
                    },
                    function (error) {
                        dispatch({
                            type: types.LOGIN_FAIL,
                            payload: error,
                        });
                        console.log(response.error);
                    }
                );
        } catch (e) {
            console.log(e);
        }
    };
};

export const signup = ({ fullName, userName, email, password }) => {
    return (dispatch) => {
        dispatch({
            type: types.SIGNUP,
            payload: { fullName, userName, email, password },
        });

        try {
            Firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    if (Firebase.auth().currentUser) {
                        const user = {
                            uid: Firebase.auth().currentUser.uid,
                            email,
                            fullName,
                            userName,
                        };
                        db.collection('users')
                            .doc(Firebase.auth().currentUser.uid)
                            .set(user)
                            .then((ref) => {
                                dispatch({
                                    type: types.SIGNUP_SUCCESS,
                                });
                            })
                            .catch((err) => {
                                dispatch({
                                    type: types.SIGNUP_FAIL,
                                    payload: `Encountered error: ${err}`,
                                });
                            });
                    } else {
                        console.log('no current user');
                    }
                })
                .catch(function (error) {
                    dispatch({
                        type: types.LOGIN_FAIL,
                        payload: error,
                    });
                    console.log(error);
                });
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateUser = ({ user }) => {
    return (dispatch) => {
        dispatch({
            type: types.UPDATE_USER,
            payload: { user },
        });

        if (Firebase.auth().currentUser) {
            db.collection('users')
                .doc(Firebase.auth().currentUser.uid)
                .update(user)
                .then(function () {
                    dispatch({
                        type: types.UPDATE_USER_SUCCESS,
                        payload: { user },
                    });
                });
        } else {
            console.log('no current user');
            dispatch({
                type: types.UPDATE_USER_FAIL,
                payload: { user },
            });
        }
    };
};
