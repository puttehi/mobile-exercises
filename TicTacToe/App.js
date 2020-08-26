import React from "react";
import { View, Text } from "react-native";
import Board from "./components/Board";
import styles from "./components/Styles";

export default function App() {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.header}>Tic Tac Toe!</Text>
      </View>
      <Text>
  {"\n" /*Expo mobile hates <br/> even though it's fine in Expo web*/}
      </Text>
      <View style={styles.container}>
        <Board />
      </View>
    </View>
  );
}
