import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    margin: 5,
  },
  banner: {
    backgroundColor: "cadetblue",
    justifyContent: "center",
    marginBottom: 20,
  },
  bannerText: {
    color: "white",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  addToDo: {
    flexDirection: "row",
    marginBottom: 20,
  },
  addToDoInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
    padding: 5,
    margin: 2,
    flex: 1,
  },
  list: {
    color: "black",
    margin: 2,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
  },
  listItemText: {},
  listItemDelete: {
    marginStart: 10,
    color: "red",
    fontWeight: "bold",
  },
});
export default styles;
