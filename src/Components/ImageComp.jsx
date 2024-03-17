import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const ImageComp = (props) => {
    return (

        <Image source={props.source} style={props.style} />

    );
}

const styles = StyleSheet.create({



})

export default ImageComp;
