import React, { useState } from 'react';
import { View, StyleSheet, Alert, Dimensions, ScrollView } from 'react-native';
import TextInputComp from '../Components/TextInputComp';
import ButtonComp from '../Components/ButtonComp';
import ImageComp from '../Components/ImageComp';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [nameVerify, setNameVerify] = useState(false);
    const [email, setEmail] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordVerify, setConfirmPasswordVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

    const handleName = (text) => {
        setName(text);
        setNameVerify(text.length > 1);
    };

    const handleEmail = (text) => {
        setEmail(text);
        setEmailVerify(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(text));
    };

    const handlePassword = (text) => {
        setPassword(text);
        setPasswordVerify(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(text));
    };

    const handleConfirmPassword = (text) => {
        setConfirmPassword(text);
        setConfirmPasswordVerify(text === password);
    };

    const handleRegister = () => {
        const userData = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        if (nameVerify && emailVerify && passwordVerify && confirmPasswordVerify) {
            axios.post("http://192.168.185.218:5001/register", userData, { timeout: 10000 })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status === "OK") {
                        Alert.alert('Success', res.data.message);
                        navigation.navigate("LoginScreen");
                    } else if (res.data.message === "Email already exists") {
                        Alert.alert('Error', 'Email already exists');
                    } else {
                        Alert.alert('Error', res.data.message || 'An error occurred while registering. Please try again later.');
                    }
                })
                .catch(e => {
                    console.log(e);
                    Alert.alert('Error', 'An error occurred while registering. Please try again later.');
                });
        } else {
            Alert.alert("Fill Mandatory Details");
        }
    };



    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                <ImageComp source={require('../../Assets/Register.jpeg')} style={styles.image} />
                <TextInputComp
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={handleName}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    verify={nameVerify}
                    value={name}
                />
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
                    value={password}
                    secureTextEntry={showPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    verify={passwordVerify}
                />
                <TextInputComp
                    style={styles.input}
                    placeholder="Confirm Password"
                    onChangeText={handleConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry={showConfirmedPassword}
                    showPassword={showConfirmedPassword}
                    setShowPassword={setShowConfirmedPassword}
                    verify={confirmPasswordVerify}
                />
                <ButtonComp stylebtn={styles.button} styletxt={styles.text} text="SIGN UP" onPress={handleRegister} />
            </ScrollView>
        </View>
    );
};

const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.8;
const inputWidth = width * 0.8;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: "white"
    },
    input: {
        width: inputWidth,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4171E9',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        width: imageWidth,
        height: imageWidth * 0.70,
        resizeMode: 'contain',
        marginTop: 50,
        marginBottom: 50,
    },
});

export default RegisterScreen;