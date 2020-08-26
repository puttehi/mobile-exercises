//NOTE: https://github.com/react-native-community/react-native-modal/issues/370

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Container, Button } from "native-base";
import { Header, Content, Footer, Title, Left, Right, Body } from "native-base";

import Dialog from "react-native-dialog";
import { Form, Item, Input } from "native-base";

import CityWidget from "./components/CityWidget";

export default function App() {
  const [modalVisible, setmodalVisible] = useState(false);
  const [cityName, setcityName] = useState("");
  const [cities, setcities] = useState([
    "Helsinki",
    "Lappi",
    "London",
    "Berlin",
    "Sikasso",
    "Samara",
  ]);
  const toggleDialog = () => {
    setmodalVisible(!modalVisible);
  };

  const cancelCity = () => {
    toggleDialog();
  };

  const addCity = () => {
    setcities([...cities, cityName]);
    setcityName("");
    //(if valid) toggleDialog() else alert("City not found!")
    toggleDialog();
  };

  const removeCity = (index) => {
    setcities(cities.filter((_, i) => i !== index));
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("@cities", JSON.stringify(cities));
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@cities");
      if (value !== null) {
        setcities(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // load cities when app starts
  useEffect(() => {
    getData();
  }, []);
  // save cities if cities state changes
  useEffect(() => {
    storeData();
  }, [cities]);

  const cityElements = cities.map((city, index) => (
    <CityWidget
      key={city}
      index={index}
      city={city}
      footer={"Some footer stuff"}
      removeText={"X"}
      onPressRemove={(index) => removeCity(index)}
    />
  ));

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Weather App</Title>
        </Body>
        <Right>
          <Button info onPress={toggleDialog}>
            <Text style={styles.buttonText}>Add a city</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <View>
          <Dialog.Container
            visible={modalVisible}
            style={{ justifyContent: "center" }}
          >
            <Dialog.Title>Add a new city</Dialog.Title>
            <Form>
              <Item>
                <Input
                  onChangeText={(text) => setcityName(text)}
                  placeholder="E.g. Helsinki"
                  clearButtonMode="always"
                  clearTextOnFocus={true}
                />
              </Item>
            </Form>
            <Dialog.Button label="Cancel" onPress={() => cancelCity()} />
            <Dialog.Button label="Add" onPress={() => addCity()} />
          </Dialog.Container>
        </View>
        <View style={styles.cityWrapper}>{cityElements}</View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: "center",
    justifyContent: "space-evenly",
  },
  cityWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
