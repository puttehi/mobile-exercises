import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    backgroundColor: "#ABC",
  },
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: "row",
  },
  movieItemImage: {
    marginRight: 5,
  },
  movieItemTitle: {
    fontWeight: "bold",
  },
  movieItemText: {
    //flexWrap: "wrap",
  },
});
export default styles;
