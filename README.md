# johns-starter-kit

An opinionated starter kit for web and mobile applications.
What is included in this starter kit:

-   tri platform functionality (android, ios, web)
-   authentication system (firebase)
-   serverless backend solution (firestore)
-   deployment/hosting system (expo/firebase)
-   basic user permissions (firebase authentication)

## Getting Started

1. create an [expo account](https://expo.io/).
2. create a [firebase account](https://firebase.google.com/) here.
3. cd into the directory `cd johns-starter-kit` run `chmod u+r+x setup.sh; chmod u+r+x setup2.sh`

> :warning: **Usage of the setup.sh script**: The following script will modify your shell profile (bash or zsh) and install homebrew, nvm, switch your active npm version to v10, and install yarn, expo-cli, and firebase-tools globally. If you have your own configuration for these already, I suggest manually installing these yourself and skipping to step 5 (setup2.sh).

4.  run `./setup.sh`
5.  then run `./setup2.sh`
6.  after logging into firebase, you will be prompted to add a Firebase CLI feature, select "Hosting" and hit enter.
7.  you will be then prompted to use a public directory, type "web-build" then hit enter.
8.  hit enter to configure as a single page application
9.  from the [firebase web console](https://console.firebase.google.com/), select the project you created and go to settings -> create web app. select "Config" under "Firebase SDK snippet" and copy the snippet
10. create a file called Secrets.js in `johns-starter-kit/config/` and add the snippet like so:
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

## Techstack Overview

Coming Soon!

## Redux Guide

Coming Soon!