import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import TextInputComp from '../Components/TextInputComp';
import ButtonComp from '../Components/ButtonComp';
import ImageComp from '../Components/ImageComp';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmail = (text) => {
        setEmail(text);
        setEmailVerify(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(text));
    };

    const handlePassword = (text) => {
        setPassword(text);
        setPasswordVerify(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(text));
    };

    const handleLogin = () => {
        console.log(email, password);
        const userData = {
            email: email,
            password: password
        }
        axios.post("http://192.168.29.218:5001/loginuser", userData)
            .then((res) => {
                if (res.data.status === "OK") {
                    Alert.alert("Logged In Successfully");
                    AsyncStorage.setItem("token", res.data.data);
                    AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                    navigation.navigate("DrawerScreen");
                } else {
                    Alert.alert("Login Failed", "Invalid email or password");
                }
            }).catch((error) => {
                Alert.alert("Error", error.message);
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                <ImageComp source={require('../../Assets/Login.png')} style={styles.image} />
                <TextInputComp
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    verify={emailVerify}
                    value={email}
                />
                <TextInputComp
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={handlePassword}
                    secureTextEntry={!showPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    verify={passwordVerify}
                    value={password}
                />
                <ButtonComp stylebtn={styles.button} styletxt={styles.text} text="SIGN IN" onPress={handleLogin} />
            </ScrollView>
        </View>
    );
};


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: "white"
    },
    input: {
        width: '80%',
        height: height * 0.06,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: height * 0.02,
        paddingHorizontal: width * 0.03,
        borderRadius: 10,
    },
    button: {
        marginTop: height * 0.02,
        backgroundColor: '#4171E9',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.2,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: height * 0.025,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        width: width * 0.8,
        height: height * 0.3,
        resizeMode: 'contain',
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
    },
});

export default LoginScreen;
