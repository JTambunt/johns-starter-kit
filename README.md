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

Coming Soon!

## Redux Guide

Coming Soon!

## Deployment Guide

Coming Soon!
