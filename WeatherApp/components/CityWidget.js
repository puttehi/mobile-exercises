import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { Card, CardItem } from "native-base";
import useAxios from "axios-hooks";

export default function CityWidget(props) {
  const onPressRemove = () => {
    props.onPressRemove(props.index);
  };

  const refreshCity = () => {
    refetch();
  }

  const getWeatherElement = (data) => {
    let elements = [];
    let elementIndex = 0;
    if (data != null && data != undefined) {
      if (data.weather[0].icon != null) {
        const ICON_URL = "https://openweathermap.org/img/wn/";
        let URL = ICON_URL + data.weather[0].icon + ".png";
        console.log(URL);
        elements.push(
          <Image style={styles.weatherIcon} source={{ uri: URL }} key={URL} />
        );
        elementIndex++;
      }
      if (data.weather[0].description != null) {
        const string = String(data.weather[0].description);
        const stringUppercased =
          string.charAt(0).toUpperCase() + string.slice(1);
        elements.push(
          <Text key={elementIndex} style={styles.weatherText}>
            {stringUppercased}
          </Text>
        );
        elementIndex++;
      }
      return elements;
    } else {
      console.log("returning...");
      return;
    }
  };

  const getTemperatureElement = (data) => {
    if (data != null && data != undefined) {
      let elements = [];
      let elementIndex = 0;
      let URL =
        "http://icons.iconarchive.com/icons/iconsmind/outline/32/Celsius-icon.png";
      elements.push(
        <Image style={styles.weatherIcon} source={{ uri: URL }} key={elementIndex} />
      );
      elementIndex++;

      if (data.main.temp != null) {
        elements.push(
          <Text key={elementIndex} style={styles.temperatureText}>
            {(data.main.temp - 273.15).toFixed(2)}
          </Text>
        );
        elementIndex++;
      }
      return elements;
    } else {
      //console.log("empty..")
      return;
    }
  };

  let city = props.city;
  const API_KEY = "185b5e58f45c2dcb79246f708f66e5df";
  const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
  const ICON_URL = "https://openweathermap.org/img/wn/";

  const [{ data, loading, error }, refetch] = useAxios(
    URL + city + "&appid=" + API_KEY
  );

  if (data) city = data.name; // Force to show OpenWeatherMaps proper city name (ID's are valid search term for example)

  let weatherElement = getWeatherElement(data);
  let temperatureElement = getTemperatureElement(data);

  return (
    <Card style={styles.card}>
      <CardItem header style={styles.header}>
        <Text style={styles.cityHeader}>{city}</Text>
        <CardItem button style={styles.removeButton} onPress={onPressRemove}>
          <Text style={styles.removeButtonText}>X</Text>
        </CardItem>
      </CardItem>

      <CardItem cardBody style={styles.body}>
        <View style={styles.elementWrapper}>{weatherElement}</View>
        <View style={styles.elementWrapper}>{temperatureElement}</View>
      </CardItem>

      <CardItem footer style={styles.footer}>
        <CardItem button style={styles.refreshButton} onPress={refreshCity}>
          <Image style={styles.refreshButtonImage}source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Refresh_icon.png/240px-Refresh_icon.png'}}></Image>
        </CardItem>
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "45%",
    backgroundColor: "lightgrey",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "lightgrey",
  },
  cityHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
  removeButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "grey",
    position: "absolute",
    width: 32,
    height: 32,
    right: 10,
  },
  removeButtonText: {
    position: "absolute",
    top: 5,
    bottom: 0,
    right: 0,
    left: 13,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 5,
    backgroundColor: "lightgrey",
  },
  elementWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  weatherIcon: {
    width: 32,
    height: 32,
  },
  footer: {
    backgroundColor: "lightgrey",
  },
  refreshButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "grey",
    position: "absolute",
    width: 32,
    height: 32,
    bottom:5,
    right: 10,
  },
  refreshButtonImage: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 3,
    bottom: 0,
    right: 0,
    left: 5,
  },
  weatherText:{
    fontSize:16,
    textAlign:'center', 
    paddingTop:3,
    paddingLeft:3
  },
  temperatureText:{
    fontSize:16,
    textAlign:'center', 
    paddingTop:3,
    paddingLeft:3
  }
});