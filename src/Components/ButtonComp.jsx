import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const ButtonComp = (props) => {
    return (
        <Pressable style={props.stylebtn} onPress={props.onPress}>
            <Text style={props.styletxt}>{props.text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({


})

export default ButtonComp;
