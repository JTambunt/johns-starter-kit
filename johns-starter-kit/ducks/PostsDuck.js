import { db } from '../config/Firebase.js';
import * as NavigationHelper from '../navigation/NavigationHelper';
// ------------------------------------ TYPES ------------------------------------
export const types = {
    CREATE_POST: 'CREATE_POST',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    CREATE_POST_FAIL: 'CREATE_POST_FAIL',
    UPDATE_POST: 'UPDATE_POST',
    UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
    UPDATE_POST_FAIL: 'UPDATE_POST_FAIL',
    SAVE_CLICKED_POST: 'SAVE_CLICKED_POST',
};

// ------------------------------------ REDUCER ------------------------------------
const INITIAL_STATE = {
    error: '',
    loading: false,
    createPostSuccess: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.CREATE_POST:
            return {
                ...state,
                loading: true,
            };
        case types.CREATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                createPostSuccess: true,
            };
        case types.CREATE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.UPDATE_POST:
            return {
                ...state,
                loading: true,
            };
        case types.UPDATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                updatePostSuccess: true,
            };
        case types.UPDATE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.SAVE_CLICKED_POST:
            return {
                ...state,
                clickedPostId: action.payload,
            };
        default:
            return state;
    }
};

// ------------------------------------ ACTIONS ------------------------------------
export const createPost = (post) => {
    return (dispatch) => {
        try {
            let postObject = Object.assign({}, post);
            postObject.date = new Date();
            const ref = db.collection('posts').doc();
            const id = ref.id;

            postObject.id = id;
            dispatch({ type: types.CREATE_POST, payload: postObject });

            db.collection('posts')
                .doc(`${id}`)
                .set(postObject)
                .then((ref) => {
                    dispatch({
                        type: types.CREATE_POST_SUCCESS,
                        payload: ref,
                    });

                    NavigationHelper.navigate('SettingsScreen');
                })
                .catch((err) => {
                    dispatch({
                        type: types.CREATE_POST_FAIL,
                        payload: `Encountered error: ${err}`,
                    });
                });
        } catch (e) {
            console.log(e);
            dispatch({
                type: types.CREATE_POST_FAIL,
                payload: 'dun goofed',
            });
        }
    };
};

export const updatePost = (ref, post) => {
    return (dispatch) => {
        try {
            let postObject = Object.assign({}, post);
            dispatch({ type: types.UPDATE_POST, payload: postObject });
            db.collection('posts')
                .doc(ref.doc)
                .update(postObject)
                .then((ref) => {
                    dispatch({
                        type: types.UPDATE_POST_SUCCESS,
                        payload: ref,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: types.UPDATE_POST_FAIL,
                        payload: `Encountered error: ${err}`,
                    });
                });
        } catch (e) {
            console.log(e);
            dispatch({
                type: types.UPDATE_POST_FAIL,
                payload: 'dun goofed',
            });
        }
    };
};

export const saveClickedPost = (postId) => {
    return (dispatch) => {
        dispatch({ type: types.SAVE_CLICKED_POST, payload: postId });
    };
};
