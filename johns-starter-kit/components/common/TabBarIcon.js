import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants';

export default function TabBarIcon(props) {
    return (
        <Ionicons
            name={props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={props.focused ? Colors.seaPink : Colors.tabIconDefault}
        />
    );
}
