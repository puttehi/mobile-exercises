import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {Text, Button, Overlay, Input} from 'react-native-elements';

export default function Game(props) {
  const [userTimer, _setuserTimer] = useState(0); // Time user took to click the button
  const [timer, _settimer] = useState(0);
  const [timerIsRunning, _settimerIsRunning] = useState(false);
  const [isScoreDialogVisible, _setisScoreDialogVisible] = useState(false);

  let nameInput = '';

  const handleClick = () => {
    if (!timerIsRunning) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const delayTimer = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const startTimer = async () => {
    const maximumStartDelay = 3.0;
    const randomStartTime = Math.random() * maximumStartDelay * 1000; // milliseconds!
    await delayTimer(randomStartTime);
    _settimerIsRunning(true);
    const startTime = Date.now();
    _settimer(startTime);
  };

  const stopTimer = () => {
    _settimerIsRunning(false);
    const stopTime = Date.now();
    saveUserTime(timer, stopTime);
  };

  const saveUserTime = (timeOnStart, timeOnStop) => {
    const timeTaken = timeOnStop - timeOnStart;
    _setuserTimer(timeTaken);
  };

  const showDialog = () => {
    _setisScoreDialogVisible(true);
  };

  const handleCancel = () => {
    _setisScoreDialogVisible(false);
  };

  const handleSubmit = (score) => {
    _setisScoreDialogVisible(false);
    props.onSubmitScore(nameInput, score)
    nameInput = '';
  };

  function GameButton() {
    if (!timerIsRunning) {
      return (
        <TouchableHighlight
          style={styles.game_button_stopped}
          onPress={handleClick}>
          <Text style={{textAlignVertical: 'center', textAlign: 'center'}}>
            Press and wait for me to turn green!
          </Text>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight
          style={styles.game_button_running}
          onPress={handleClick}>
          <Text style={{textAlignVertical: 'center', textAlign: 'center'}}>
            Quick! Press me again!
          </Text>
        </TouchableHighlight>
      );
    }
  }

  const scoreString = 'Post your last score(' + userTimer + ' ms)';

  return (
    <View>
      <ScrollView>
        <View style={[props.containerStyle, styles.game_container]}>
          <Text h4 style={styles.game_info}>
            Press the button as soon as it turns green!
          </Text>
          <Text style={styles.start_text}>Press the button to start:</Text>
          <View style={styles.game_button_container}>
            <GameButton />
          </View>
          <View style={styles.score_button_container}>
            <Button rounded title={scoreString} onPress={showDialog} />
          </View>
        </View>
      </ScrollView>
      <View>
        <Overlay
          isVisible={isScoreDialogVisible}
          onBackdropPress={handleCancel}>
          <View style={{display: 'flex', flexDirection: 'column', width: 300, padding:10}}>
            <Text h3 style={{alignSelf: 'center'}}>
              Submit your score
            </Text>
            <View style={{padding:10, marginBottom:-10}}>
            <Input
              placeholder="Please enter your name"
              onChangeText={(text) => {
                nameInput = text;
              }}
            />
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Button title='Cancel' onPress={handleCancel} buttonStyle={{paddingLeft:30, paddingRight:30, marginRight: 30}}/>
              <Button title='Submit' onPress={() => handleSubmit(userTimer)} buttonStyle={{paddingLeft:30, paddingRight:30, marginLeft: 30}}/>
            </View>
          </View>
        </Overlay>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  game_info: {
    textAlign: 'center',
    padding: 20,
    textDecorationLine: 'underline',
  },
  game_container: {
    //backgroundColor: '#BB4081',
  },
  start_text: {
    textAlign: 'center',
    padding: 20,
    fontSize: 20,
  },
  game_button_container: {
    paddingTop: 10,
  },
  score_button_container: {
    paddingTop: 30,
    paddingBottom: 30,
    width: '75%',
    alignSelf: 'center',
  },
  game_button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  game_button_stopped: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  game_button_running: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'green',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
