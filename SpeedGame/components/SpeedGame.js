import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView} from 'react-native-tab-view';

import Game from './Game'
import Leaderboard from './Leaderboard';

const initialLayout = { width: Dimensions.get('window').width };

const Realm = require('realm');

const ScoreSchema = {
  name: 'Player',
  properties: {
    name:  'string',
    score: 'int'
  }
};

export default function SpeedGame() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'game', title: 'Play' },
    { key: 'scores', title: 'Leaderboard' },
  ]);
  const [realm, setrealm] = useState(null);

  useEffect(() => {
    Realm.open({schema: [ScoreSchema]})
    .then(realm => {
      setrealm(realm);
  })
    return () => {
      const {realm} = this.state;
      if (realm !== null && !realm.isClosed) {
        realm.close();
      }
    }
  }, [])

  const submitScore = (name, score) => {
    console.log("submitScore: name: " + name + " with score: " + score)
    if (realm) realm.write(() => {
      realm.create('Player', {name: name, score: score});
    });
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'game':
        return <Game containerStyle={styles.scene} onSubmitScore={(name, score) => {submitScore(name, score)}}/>;
      case 'scores':
        return <Leaderboard containerStyle={styles.scene} scores={realm.objects('Player')}/>;
      default:
        return null;
    }
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#d9d9d9'
  },
});