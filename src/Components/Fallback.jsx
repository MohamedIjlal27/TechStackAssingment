/** @format */

import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Fallback = () => {
  return (
    <View style={{ alignItems: "center", backgroundColor: "white" }}>
      <Image
        source={require("../../Assets/ToDo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Your Task List is Empty! Start Adding Your Task</Text>
    </View>
  );
};

export default Fallback;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    marginBottom: 150
  },
  text: {
    fontWeight: "900",
    fontSize: 17,
    color: "red"
  }
});
