import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  texts: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
    color: "#FE9000",
  },
  boardRow: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    margin: "auto",
    backgroundColor: "#5B616A",
    display: "flex",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  body: {
    margin: "auto",
    paddingTop: Constants.statusBarHeight,
  },
  square: {
    backgroundColor: "#3C6997",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#094074",
    height: 36,
    width: 36,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 34,
    textAlign: "center",
    color: "#FE9000",
  },
  squareText: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 34,
    textAlign: "center",
    color: "#FFDD4A",
  },

  game: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 10,
    paddingTop: 5,
  },
  gameContainer: {
    margin: "auto",
  },
  restartButton: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#3C6997",
    borderColor: "#094074",
  },
});

export default styles;
