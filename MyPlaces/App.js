import React, { useState, useEffect } from "react";

import GeoView from "./components/GeoView";
import { TouchableNativeFeedbackBase } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { Root } from "native-base";
import * as Font from "expo-font";
import { AppLoading } from "expo";

export default function App() {
  const [loading, setloading] = useState(true);
  const [locations, setlocations] = useState([
    {
      coords: {
        latitude: 60.2054911,
        longitude: 24.6559,
      },
      name: "Espoo",
      info: "It'sa Espoo!",
    },
  ]);
  const [region, setregion] = useState({
    latitude: 60.2054911,
    longitude: 24.6559,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });
  const addLocations = async (location) => {
    if (!location) {
      console.log("Tried to add invalid location!");
      return;
    }
    //setlocations([...locations, location]);
    //(if valid) toggleDialog() else alert("City not found!")
    //toggleDialog();
    let latitudeLongitude = await findPlace(location.name); // Returns {lat, lng}
    if (latitudeLongitude) {
      const newArray = [...locations];
      newArray.push(
        { 
          coords: {
            latitude: latitudeLongitude.lat, 
            longitude: latitudeLongitude.lng
          }, 
          name: location.name, 
          info: location.info,
          }
      );
      setlocations(newArray);
      setregion({
        latitude: latitudeLongitude.lat, 
        longitude: latitudeLongitude.lng,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      })
    }
  };

  const findPlace = async (cityName) => {
    const API_KEY = "AIzaSyARk-sEKfChhrapWVGSEyE1Y3GNqlQfYJI";
    const GOOGLE_PLACES_BASE_URL =
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
    let URI =
      GOOGLE_PLACES_BASE_URL +
      "?key=" +
      API_KEY +
      "&input=" +
      cityName +
      "&inputtype=" +
      "textquery" +
      "&fields=geometry";
    let latitudeLongitude;
    await fetch(URI)
      .then((response) => response.json())
      .then((data) => {
        if (data.candidates[0]) {
          latitudeLongitude = {
            lat: data.candidates[0].geometry.location.lat,
            lng: data.candidates[0].geometry.location.lng,
          };
        }
      });
    return latitudeLongitude;
  };

  const removeLocation = (index) => {
    if (locations.length == 1){ // If user is removing the last remaining place, go back to default region
      setregion({
        latitude: 60.2054911,
        longitude: 24.6559,
        latitudeDelta: 60.2054911 / 100,
        longitudeDelta: 24.6559 / 100,
      })
    }
    const newArray = locations.filter((_, i) => i !== index);
    setlocations(newArray);
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("@locations", JSON.stringify(locations));
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@locations");
      if (value !== null) {
        let parsed = JSON.parse(value);
        setlocations(parsed);
        //setlocations();
        setregion({
          latitude: parsed[parsed.length-1].coords.latitude,
          longitude: parsed[parsed.length-1].coords.longitude,
          latitudeDelta: parsed[parsed.length-1].coords.latitude/10,
          longitudeDelta: parsed[parsed.length-1].coords.longitude/10,
        })
      }
    } catch (e) {
      console.log(e);
    }
  };

  // load locations when app starts
  useEffect(() => {
    async function suppressFontError() {
      await Font.loadAsync({
        Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
      });
      setloading(false);
    }
    suppressFontError();
    getData();
  }, []);
  // save locations if locations state changes
  useEffect(() => {
    storeData();
  }, [locations]);

  if (loading) {
    return (
      <Root>
        <AppLoading />
      </Root>
    );
  } else {
    return (
      <Root>
        <GeoView
          locations={locations}
          add={addLocations}
          remove={removeLocation}
          region={region}
        />
      </Root>
    );
  }

  return (
    <GeoView locations={locations} add={addLocations} remove={removeLocation} />
  );
}
