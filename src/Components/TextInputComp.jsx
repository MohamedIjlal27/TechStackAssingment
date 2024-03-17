import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const TextInputComp = (props) => {
    const { placeholder, onChangeText, value, keyboardType, verify, showPassword, setShowPassword, secureTextEntry } = props;

    const safeValue = value || '';

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    onChangeText={(e) => onChangeText(e)}
                    value={safeValue}
                    keyboardType={keyboardType}
                    underlineColor="transparent"
                    secureTextEntry={!secureTextEntry}
                />
                {placeholder === "Password" || placeholder === "Confirm Password" || placeholder === "User Password" ? <Pressable onPress={() => setShowPassword(!showPassword)}>{safeValue.length < 1 ? null : showPassword ? <Icon name="eye-off" color={verify ? 'green' : 'red'} size={20} /> : <Icon name="eye" color={verify ? 'green' : 'red'} size={20} />}</Pressable> : (safeValue.length < 1 ? null : verify ? <Icon name="check-circle" color="green" size={20} /> : <Icon name="x-circle" color="red" size={20} />)}


            </View>
            {
                (safeValue.length < 1 ? null : verify ? null : (
                    <Text style={styles.text}>{placeholder === "Email" ? "Enter Proper Email Address" : placeholder === "Password" ? "UpperCase, LowerCase,   Number and 6 or more characters" : placeholder === "Confirm Password" ? "Password Miss Match" : placeholder === "User Password" ? null : placeholder + " should more be than 1 characters"}</Text>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        width: "100%"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'transparent',
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        color: 'black',
    },

    icon: {
        marginRight: 10,
    },

    text: {
        marginLeft: 20,
        color: 'red'
    }
});

export default TextInputComp;
