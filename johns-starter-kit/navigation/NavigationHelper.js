import React from 'react';
import { StackActions, CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function push(...args) {
    navigationRef.current?.dispatch(StackActions.push(...args));
}

export function replace(...args) {
    navigationRef.current?.dispatch(StackActions.replace(...args));
}

export function goBack(name, params) {
    navigationRef.current?.goBack(name, params);
}

export function popToTop() {
    navigationRef.current?.popToTop();
}

export function navigateAndReset(name, params) {
    navigationRef.current?.dispatch(
        CommonActions.reset({
            index: 0,
            actions: [
                navigationRef.current?.navigate({
                    name,
                    params,
                }),
            ],
        })
    );
}
