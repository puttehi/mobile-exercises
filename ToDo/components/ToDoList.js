import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  Keyboard,
} from "react-native";

import styles from "../styles/styles";

import ListItem from "./ListItem";

export default class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      text: "",
    };
  }

  addToDoItem = () => {
    // Arrow function, no need to .bind(this)
    if (this.state.text !== "") {
      this.setState({
        items: [...this.state.items, this.state.text], // push to array
        text: "", // reset text state after adding
      });
      Keyboard.dismiss();
    }
  };

  deleteToDoItem = (index) => {
    var items = this.state.items;
    items.splice(index, 1);
    this.setState({items:items});
  }

  render() {
    var items = this.state.items.map(function (item, index) {
      return <ListItem text={item} key={index} index={index} deleteToDoItem={this.deleteToDoItem}/>;
    }.bind(this));
    return (
      <View>
        <View style={styles.addToDo}>
          <TextInput
            style={styles.addToDoInput}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            title="Add"
            style={styles.addToDoButton}
            onPress={this.addToDoItem}
          />
        </View>
        <ScrollView style={styles.list}>{items}</ScrollView>
      </View>
    );
  }
}
