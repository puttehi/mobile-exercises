import React from 'react';
import { StyleSheet, Text, View, Keyboard, TextInput } from 'react-native';

import styles from './styles/styles'
import Banner from './components/Banner'
import ToDoList from './components/ToDoList'

export default function App() {
  return (
    <View style={styles.container}>
      <Banner/>
      <ToDoList/>
    </View>
  );
  }