import React, { Component } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import styles from "../styles/styles";
export class MoviesListItem extends Component {
  render() {
    let IMAGEPATH = "http://image.tmdb.org/t/p/w500";
    let imageurl = IMAGEPATH + this.props.movie.poster_path;
    let fullWidth = Dimensions.get('window').width * 0.65; // Text doesn't wrap on react-native for some reason, using this to force wrapping..
    //console.log(fullWidth);
    //console.log(imageurl)
    return (
      <View style={styles.movieItem}>
        <View style={styles.movieItemImage}>
          <Image source={{uri: imageurl}} style={{width: 99, height: 146}} />
        </View>
        <View style={{marginRight: 50, width: fullWidth}}>
          <Text style={styles.movieItemTitle}>{this.props.movie.title}</Text>
          <Text style={styles.movieItemText}>{this.props.movie.release_date}</Text>
          <Text numberOfLines={6} ellipsizeMode="tail" style={styles.movieItemText}>{this.props.movie.overview}</Text>
        </View> 
      </View>
    );
  }
}

export default MoviesListItem;
