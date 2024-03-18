import React from 'react';
import { View, StyleSheet } from 'react-native';
import Welcome from './Welcome';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerScreen from './DrawerScreen';

const Stack = createStackNavigator();
const StartScreen = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
}

const styles = StyleSheet.create({})

export default StartScreen;
