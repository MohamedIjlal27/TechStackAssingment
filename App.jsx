import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/Screens/Welcome';
import RegisterScreen from './src/Screens/RegisterScreen';
import LoginScreen from './src/Screens/LoginScreen';
import DrawerScreen from './src/Screens/DrawerScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';


LogBox.ignoreAllLogs();


const Stack = createStackNavigator();

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await AsyncStorage.getItem("isLoggedIn");
        if (data) {
            setIsLoggedIn(true);
        }
    };

    return (
        <NavigationContainer>
            {
                isLoggedIn ? (<Stack.Navigator><Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} /></Stack.Navigator>) :
                    (<Stack.Navigator>
                        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                    )

            }

        </NavigationContainer>
    );
};

export default App;


