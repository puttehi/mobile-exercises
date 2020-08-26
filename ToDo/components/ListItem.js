import React, { Component } from "react";
import { Text, View } from "react-native";

import styles from "../styles/styles";

export default class ListItem extends Component {
  deleteToDoItem = (index) => {
    this.props.deleteToDoItem(index);
  };

  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>* {this.props.text}</Text>
        <Text
          style={styles.listItemDelete}
          onPress={(e) => this.deleteToDoItem(this.props.index)}
        >
          X
        </Text>
      </View>
    );
  }
}
