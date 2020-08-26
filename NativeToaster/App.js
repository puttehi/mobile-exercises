/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import NativeToaster from './NativeToaster'

const App: () => React$Node = () => {
  NativeToaster.show('This is a long duration native toast', NativeToaster.LONG);
  NativeToaster.show('This is a short duration native toast', NativeToaster.SHORT);
  NativeToaster.show('Toasts seem to have a queuing system', NativeToaster.SHORT);
  NativeToaster.show('Nice!', NativeToaster.LONG);
  NativeToaster.flipGravity();
  NativeToaster.show('You can also show them on any coordinates it seems!', NativeToaster.LONG);
  NativeToaster.show('Although you need to pay attention to line length to keep them centered it seems :/', NativeToaster.LONG);
  NativeToaster.flipGravity();
  NativeToaster.show('Pretty cool stuff regardless! :)', 100);
  return (
    <View>
     <Text style={{textAlign:'center', paddingTop:270, fontSize: 36}}>Native Module (Toaster) demo </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
