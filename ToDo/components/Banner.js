import React, { Component } from "react";
import { Text, View } from "react-native";

import styles from "../styles/styles";

export default class Banner extends Component {
  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerText}>ToDo example with React Native</Text>
      </View>
    );
  }
}
