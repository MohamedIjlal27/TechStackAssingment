import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Our App!</Text>
            <Text style={styles.subtitle}>Discover Amazing Features</Text>
            <Image
                source={require('../../Assets/home_image.png')}
                style={styles.image}
                resizeMode="cover"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    button: {
        width: '80%',
        paddingVertical: 10,
        borderRadius: 20,
    },
});

export default Home;
