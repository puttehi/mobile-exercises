import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Square from "./Square";
import styles from "./Styles";
export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: ["", "", "", "", "", "", "", "", ""],
      isPlayerX: true,
      winner: "",
    };
    this.baseState = this.state;
  }

  renderSquare(i) {
    return (
      <Square
        mark={this.state.squares[i]}
        //mark={i}
        onPress={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const isPlayerX = this.state.isPlayerX;
    // Don't mutate state if game was won (freeze board state on win)
    // Also disallow changing existing marks during game
    if (this.state.winner === "" && squares[i] === "") {
      squares[i] = isPlayerX ? "X" : "O";
      this.setState({ squares: squares, isPlayerX: !isPlayerX });
    }
    const winner = this.checkWinner(squares);
    this.setState({ winner: winner });
  }

  // Returns "X" or "O" if game was won, if game was not won "" will be returned
  checkWinner(squares) {
    const row0 = squares.slice(0, 3); // top row
    const row1 = squares.slice(3, 6); // mid row
    const row2 = squares.slice(6, 9); // bot row
    const column0 = [row0[0], row1[0], row2[0]]; // left column
    const column1 = [row0[1], row1[1], row2[1]]; // mid column
    const column2 = [row0[2], row1[2], row2[2]]; // right column
    const diagonal0 = [row0[0], row1[1], row2[2]]; // top left -> bottom right
    const diagonal1 = [row2[0], row1[1], row0[2]]; // bottom left- > top right
    const combinations = row0.concat(
      row1,
      row2,
      column0,
      column1,
      column2,
      diagonal0,
      diagonal1
    );
    for (let i = 0; i < combinations.length; ) {
      var temp = "";
      for (let j = 0; j < 3; j++) {
        temp += combinations[i];
        if (temp === "XXX") {
          return "X";
        } else if (temp === "OOO") {
          return "O";
        }
        i++;
      }
    }
    return "";
  }
  restartGame() {
    this.setState(this.baseState);
  }

  render() {
    var status = "Next player: " + (this.state.isPlayerX ? "X" : "O");
    if (this.state.winner != "") {
      status = this.state.winner + " won the game!";
    }
    return (
      <View style={styles.gameContainer}>
        <View>
          <Text style={styles.texts}>{status}</Text>
        </View>
        <View style={styles.game}>
          <View style={styles.boardRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </View>
          <View style={styles.boardRow}>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </View>
          <View style={styles.boardRow}>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.restartGame()}
          style={styles.restartButton}
        >
          <Text style={styles.texts}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
