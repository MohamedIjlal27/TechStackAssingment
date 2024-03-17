import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Task2 from './Task2_API_Handling';
import DrawerContent from '../Components/DrawerContent';
import Home from './Home';
import Profile from './Profile';
import ToDoScreen from './ToDoScreen';

const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="API Handling" component={Task2} />
            <Drawer.Screen name="ToDo Screen" component={ToDoScreen} />
            <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Drawer.Navigator>

    );
}

const styles = StyleSheet.create({})

export default DrawerScreen;
