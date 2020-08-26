
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Platform,
  Linking,
} from 'react-native';

import { Button, Text, Input } from 'react-native-elements';

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
 
  const launchMap = () => {
    const location = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });
    Linking.openURL(url);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.area}>
          <Text>Give latitude value:</Text>
          <TextInput placeholder='Latitude' onChangeText={text => setLatitude(text)} style={{borderWidth:1}}/>
          <Text>Give longitude value:</Text>
          <TextInput placeholder='Longitude' onChangeText={text => setLongitude(text)} style={{borderWidth:1}}/>
          <Button title="Launch a Map" onPress={launchMap}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  area: {
    margin: 20
  }
});