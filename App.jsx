import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/Screens/Welcome';
import RegisterScreen from './src/Screens/RegisterScreen';
import LoginScreen from './src/Screens/LoginScreen';
import DrawerScreen from './src/Screens/DrawerScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Reanimated 2']);

const DrawScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator >
            <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="StackNav" component={StackNav} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const StackNav = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="Login Screen" component={LoginScreen} options={{ animation: 'slide_from_left' }} />
            <Stack.Screen name="Register Screen" component={RegisterScreen} options={{ animation: 'slide_from_right' }} />
        </Stack.Navigator>
    )
}

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const data = await AsyncStorage.getItem("isLoggedIn");
            setIsLoggedIn(data === 'true');
        };
        getData();
    }, []);

    return (
        <NavigationContainer>
            <ToastProvider>
                {isLoggedIn ? <DrawScreen /> : <StackNav />}
            </ToastProvider>
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({});
