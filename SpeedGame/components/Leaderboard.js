import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';

export default function Leaderboard(props) {
  return (
    <ScrollView>
      <View style={[props.containerStyle, styles.containerStyle]}>
        {props.scores.map((data, index) => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                borderWidth: 1,
              }}
              key={index}>
              <Text style={{padding: 20, paddingRight: 80}}>{data.name}</Text>
              <Text style={{padding: 20, paddingLeft: 80}}>{data.score}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});
