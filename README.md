# johns-starter-kit

Check out the video tutorial [here](https://www.youtube.com/watch?v=LiZ4PYPtZGA&feature=emb_title&ab_channel=FSAB)!

An opinionated starter kit for web and mobile applications.
What is included in this starter kit:

-   tri-platform support (android, ios, web)
-   authentication system (firebase)
-   serverless backend solution (firestore)
-   deployment/hosting system (expo/firebase)
-   basic ui/navigation system (react-navigation)
-   basic user permissions (firebase authentication) (coming soon!)
-   push notification example (expo) (coming soon!)

---

## Getting Started

1. create an [expo account](https://expo.io/).
2. create a [firebase account](https://firebase.google.com/).
3. from the [firebase web console](https://console.firebase.google.com/), create a project.
4. Inside the project you just created, click on the add </> icon to create a web app. (ignore the Hosting option and the SDK script)
5. click Develop -> Authentication -> Sign-in method -> Email/Password -> toggle Enable
6. click Develop -> Cloud Firestore -> Create database -> select 'Start in test mode' -> Enable
7. click Settings (gear icon) -> scroll down to the app you just made, select "Config" under "Firebase SDK snippet" and copy the snippet
8. create a file called Secrets.js in `johns-starter-kit/config/` and add the snippet like so:

```shell
export const firebaseConfig = {
    apiKey: "*******************************",
    authDomain: "*************.firebaseapp.com",
    databaseURL: "https://**********.firebaseio.com",
    projectId: "*************",
    storageBucket: "************.appspot.com",
    messagingSenderId: "************",
    appId: "***********************",
    measurementId: "**********"
};
```

1. Install the following:

    - install [homebrew](https://brew.sh/)
    - install nvm (`brew install nvm`)
    - switch your active npm version to v10 (`nvm install 10 && nvm use 10`)
    - install yarn (`npm install -g yarn`)
    - install expo-cli (`npm install -g expo-cli`)
    - and install firebase-tools globally (`npm install -g firebase-tools`)

2. From the `johns-starter-kit` directory, run `yarn install`

<!-- 10. cd into the directory `cd johns-starter-kit` run `chmod u+r+x setup.sh`

> :warning: **Usage of the setup.sh script**: The following script will modify your shell profile (assumes bash_profile or zshrc), install homebrew, install nvm, switch your active npm version to v10, install yarn, install expo-cli, and install firebase-tools globally. If you have your own configuration for these already, I suggest manually installing these yourself and installing the project specific packages with `yarn install`.

1.  run `./setup.sh` -->

You should now be all set! To run the app, use the command `expo start` followed by the device you would like to run it on `i` for the iOS simulator, `a` for the android simulater, `w` for running it on the browser, or `e` to run it on your device (setup/installation of the expo app required to run on physical device)

---

## Techstack Overview

**React Native:**
[React Native](https://reactnative.dev/) is a frontend javascript library used to create mobile applications. React Native is great because you can essentially write one app and deploy it on both the iOS and Android app stores. Other alternatives to React Native are: Angular.js, Vue.js, writing an iOS app natively in swift/obj-c, and writing an android app natively in Java.

**Expo:**
[Expo](https://expo.io/) is an SDK (Software Development Kit) used to expedite the buiilding and deploying of React Native apps.

**React Navigation:**
[React Navigation](https://reactnavigation.org/) is a node package used for handling navigation within a React Native app.

```js
this.props.navigation.navigate('Settings');
```

> Note: typical navigation call from a component

**Firebase:**
[Firebase](https://firebase.google.com/?gclid=CjwKCAjw2Jb7BRBHEiwAXTR4jeO99xXZpUsJe5yOE5YBGhWT2VGmU51H10_UcD6rmNNnUxOI1Zet5RoC-bMQAvD_BwE) is an SDK that combines a lot of backend services into one platform. In this case, we use it as a database (Firestore), authentication system, and as a hosting service.

---

## Redux Guide

[Redux](https://redux.js.org/) is "A Predictable State Container for JS Apps"

The easiest way I can describe redux is, it's a way to manage the global state of your application. What is the global state? It's essentially a JS object that you can access from any component. We use redux when we make network calls to our database by dispatching actions from the ui components.

This diagram may be helpful to understand how redux works:

<img src="https://miro.medium.com/max/2000/1*UlUxZFIVEyxVjV1K70BzJQ.png" width="500">

When the user presses 'submit' after filling in a post, we fire a CREATE_POST action. The reducer is then responsible for updating the global state based on the action and the data tied to it (the payload). We then map the global state and connect it (parts of it) to the component we want to update through MapStateToProps.

Unlike others that break up their files by type:

<img src="https://cdn-images-1.medium.com/max/2000/1*HM8M2Agd_TBfU4Zm1_lEJA.png" width="250">

I've found it much easier to manage by putting the actions, reducers, and action types all in one file per feature called a 'Duck'. Each duck is organized in the following order:

**Types:**

```js
export const types = {
    CREATE_POST: 'CREATE_POST',
    CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
    CREATE_POST_FAIL: 'CREATE_POST_FAIL',
};
```

**Reducer:**

```js
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
        default:
            return state;
    }
};
```

**Action:**

```js
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
```

Our [rootReducer.js](./johns-starter-kit/rootReducer.js) combines all of our reducers which gets passed into our store.js

---

## Deployment Guide

To deploy on the web, first, build the project using expo `expo build:web`. This should create a directory `web-build` with the bundled wep app. To use firebase for hosting, run: `firebase init`, select `Hosting`, for the public directory type `web-build` to point it to the build expo created. Do not overwrite the index.html file built with expo. Then, just run `firebase deploy`, and click on the link generated by firebase.
