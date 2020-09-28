import React from 'react';
import { View, Text } from 'react-native';

import { Colors } from '../../constants';

export default function CommentItem(props) {
    return (
        <View
            style={{
                borderColor: Colors.white,
                borderWidth: 2,
                backgroundColor: Colors.turkishSea,
                marginHorizontal: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    color: Colors.white,
                    fontFamily: 'gilbert',
                    fontSize: 14,
                    marginRight: 12,
                    marginLeft: 12,
                    marginVertical: 5,
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                    }}
                >{`${props.userName}: `}</Text>
                {`${props.comment}`}
            </Text>
            <Text
                style={{
                    color: Colors.white,
                    fontFamily: 'gilbert',
                    fontSize: 14,
                    marginRight: 10,
                }}
            >
                {props.createdAt}
            </Text>
        </View>
    );
}
