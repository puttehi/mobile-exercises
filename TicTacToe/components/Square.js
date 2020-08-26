import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./Styles";
export default class Square extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mark: props.mark,
      onPress: props.onPress,
    };
  }

  //Since this component is using a constructor (instead of passing props straight to render), the props will not update
  //unless componentWillReceiveProps(props) is used in the component:
  componentWillReceiveProps(props) {
    this.setState({ mark: props.mark, onPress: props.onPress });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.state.onPress} style={styles.square}>
        <Text style={styles.squareText}>{this.state.mark}</Text>
      </TouchableOpacity>
    );
  }
}
