import React from 'react';
import {Text, Button} from 'react-native-elements';
import {View} from 'react-native';

import SpeedGame from './components/SpeedGame'; 

export default function App() {
  return (
    <View style={{flex:1}}>
      <Text h3 style={{textAlign: 'center', padding: 20}}>
        How fast are your reactions?
      </Text>
      <SpeedGame/>
    </View>
  );
}
