# johns-starter-kit

An opinionated starter kit for web and mobile applications.
What is included in this starter kit:

-   tri-platform support (android, ios, web)
-   authentication system (firebase)
-   serverless backend solution (firestore)
-   deployment/hosting system (expo/firebase)
-   basic ui/navigation system (react-navigation)
-   basic user permissions (firebase authentication) (coming soon!)
-   push notification example (expo) (coming soon!)

## Getting Started

1. create an [expo account](https://expo.io/).
2. create a [firebase account](https://firebase.google.com/).
3. from the [firebase web console](https://console.firebase.google.com/), create a project.
4. Inside the project you just created, click on the add </> icon to create a web app. (ignore the Hosting option and the SDK script)
5. click Develop -> Authentication -> Sign-in method -> Email/Password -> toggle Enable
6. click Settings (gear icon) -> scroll down to the app you just made, select "Config" under "Firebase SDK snippet" and copy the snippet
7. create a file called Secrets.js in `johns-starter-kit/config/` and add the snippet like so:

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

8. cd into the directory `cd johns-starter-kit` run `chmod u+r+x setup.sh`

> :warning: **Usage of the setup.sh script**: The following script will modify your shell profile (assumes bash_profile or zshrc), install homebrew, install nvm, switch your active npm version to v10, install yarn, install expo-cli, and install firebase-tools globally. If you have your own configuration for these already, I suggest manually installing these yourself and installing the project specific packages with `yarn install`.

9.  run `./setup.sh`

## Techstack Overview

    React Native:
        [React Native](https://reactnative.dev/) is a frontend javascript library used to create mobile applications. React Native is great because you can essentially write one app and deploy it on both the iOS and Android app stores. Other alternatives to React Native are: Angular.js, Vue.js, writing an iOS app natively in swift/obj-c, and writing an android app natively in Java.

    Expo:
        [Expo](https://expo.io/) is an SDK (Software Development Kit) used to expedite the buiilding and deploying of React Native apps.

    React Navigation:
        [React Navigation](https://reactnavigation.org/) is a node package used for handling navigation within a React Native app.

    Firebase:
        [Firebase](https://firebase.google.com/?gclid=CjwKCAjw2Jb7BRBHEiwAXTR4jeO99xXZpUsJe5yOE5YBGhWT2VGmU51H10_UcD6rmNNnUxOI1Zet5RoC-bMQAvD_BwE) is an SDK that combines a lot of backend services into one platform. In this case, we use it as a database (Firestore), authentication system, and as a hosting service.

## Redux Guide

    [Redux](https://redux.js.org/) is "A Predictable State Container for JS Apps"

    The easiest way I can describe redux is, it's a way to manage the global state of your application. What is the global state? It's essentially a JS object that you can access from any component. This [diagram](https://miro.medium.com/max/2000/1*UlUxZFIVEyxVjV1K70BzJQ.png) is a useful way of understanding how redux works.

## Deployment Guide

Coming Soon!
