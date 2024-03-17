import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import ImageComp from '../Components/ImageComp';
import ButtonComp from '../Components/ButtonComp';
import { Toast } from "react-native-toast-notifications";
import { useNavigation } from '@react-navigation/native';
const Welcome = () => {
  const navigation = useNavigation();
  const showToast = (message) => {
    Toast.show(message, {
      type: "normal",
      placement: "top",
      duration: 4000,
      offset: 30,
      animationType: "slide-in",
    });
  }
  return (
    <View style={styles.container}>
      <ImageComp source={require('../../Assets/StackTech.png')} style={styles.image} />
      <View style={styles.choice}>
        <ButtonComp onPress={() => navigation.navigate("Login Screen", showToast("Welcome to Login!"))} stylebtn={styles.button} styletxt={styles.text} text={"Login"} />
        <ButtonComp onPress={() => navigation.navigate("Register Screen", showToast("Welcome to Register!"))} stylebtn={styles.button} styletxt={styles.text} text={"Register"} />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  choice: {
    marginTop: height * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.1,
  },
  button: {
    marginBottom: height * 0.05,
    backgroundColor: '#1FAEE2',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.08,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.03,
  },
  text: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
    marginTop: height * 0.1,
    marginBottom: height * 0.1,
  },
});

export default Welcome;
