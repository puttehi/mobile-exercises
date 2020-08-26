import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { MoviesList } from "./MoviesList";
import styles from '../styles/styles'; 



export default class MoviesListScreen extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       navigation: props.navigation,
    }
  }
  
  render(){
    return(
    <View>
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
          <MoviesList navigation={this.state.navigation}/>
      </ScrollView>
    </SafeAreaView>
    </View>
  );
}
}
