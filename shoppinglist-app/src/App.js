import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import analytics from "firebase/analytics";
import "firebase/firestore";

// import for Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  CardActionArea,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

const firebaseConfig = {
  apiKey: "AIzaSyAYvfXuzz480_8iE6KvCi_iUn4mu9-XbOQ",
  authDomain: "shoppinglist-1d315.firebaseapp.com",
  databaseURL: "https://shoppinglist-1d315.firebaseio.com",
  projectId: "shoppinglist-1d315",
  storageBucket: "shoppinglist-1d315.appspot.com",
  messagingSenderId: "871901465086",
  appId: "1:871901465086:web:7cbf53fa7d3a92761e98af",
  measurementId: "G-YDDW16VQMD",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// styles for Material-UI
const useStyles = makeStyles((theme) => ({
  itemCard: {
    borderWidth: 10,
    borderRadius: 10,
    borderColor: "#FFAABB",

    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    padding:10,
    flexDirection: "column",
  },
  textBox: {},
  wrapper: {
    textAlign: "center",
  },
  appContainer: {
    display: "inline-block",
  },
}));

function App() {
  // loading state
  const [loading, setLoading] = useState(true);
  // shopping list items state
  const [items, setItems] = useState([]);
  // item to add
  const [item, setItem] = useState("");
  // itemcount to add
  const [count, setCount] = useState(1);

  // material-UI classes
  const classes = useStyles();
  // load shopping list items
  useEffect(() => {
    const fetchData = async () => {
      // database
      const db = firebase.firestore();
      // data
      const data = await db.collection("items").get();
      // shopping list items: name, count and id
      const items = data.docs.map((doc) => {
        return {
          name: doc.data().name,
          count: doc.data().count,
          id: doc.id,
        };
      });
      // set states
      setItems(items);
      setLoading(false);
    };
    // start loading data
    fetchData();
  }, []); // called only once


  // add a new item to data base and shopping list items
  const addItem = async () => {
  // create a new shopping list item
  let newItem =  { name: item, count: count, id: '' };
  // add to database
  const db = firebase.firestore();
  let doc = await db.collection('items').add(newItem);
  // get added doc id and set id to newItem
  newItem.id = doc.id;
  // update states
  setItems( [...items,newItem]);
  setItem("");
  setCount(1);
}
// delete item from database and UI
const removeItem = async (item) => {
  // remove from db
  const db = firebase.firestore();
  db.collection('items').doc(item.id).delete();
  // delete from items state and update state
  let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
  setItems(filteredArray);  
}

  // render loading... text
  if (loading) return <p>Loading...</p>;

  // create shopping list items
  const sh_items = items.map((item, index) => {
    return (
      <Card key={index} className={classes.itemCard}>
        <CardActionArea onClick={() => removeItem(item)}>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.name} x{item.count}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

  const possibleNumbers = [];
  for (let i = 0; i < 99; i++) {
    possibleNumbers.push(i);
  }

  // create shopping list items
  const sh_menuitems = possibleNumbers.map((item, index) => {
    return <MenuItem value={index}>{index}</MenuItem>;
  });

  // render shopping list
  return (
    <div className={classes.wrapper}>
          <Typography variant="header1" color="textPrimary" component="h1">
      Shopping List
    </Typography>
      <div className={classes.appContainer}>
        <div className={classes.inputContainer}>
          <FormControl>
            <TextField
              placeholder="Enter item name"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            ></TextField>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            >
              {sh_menuitems}
            </Select>
          </FormControl>
          <Button variant="outlined" color="default" style={{margin: 10}} onClick={addItem}>
        Add
      </Button>
        </div>
        {sh_items}
      </div>
    </div>
  );
}
export default App;
