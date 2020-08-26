import React, { Component, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { MoviesListItem } from "./MoviesListItem";
import { TouchableHighlight } from "react-native-gesture-handler";

export class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      navigation: props.navigation,
    };
  }
  componentDidMount() {
    this.getMoviesFromAPI();
  }
  getMoviesFromAPI = () => {
    let APIKEY = "131a5099b093bc6be5d7667c276219c0";
    let BASEURL = "https://api.themoviedb.org/3/movie/upcoming";
    let url = `${BASEURL}?api_key=${APIKEY}`;
    console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.results)
        this.setMovies(json.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setMovies = (movies) => {
    this.setState({ movies: movies });
    //console.log(movies);
  };

  movieListItemPressed = (index) => {
    this.state.navigation.navigate('Details', { movie: this.state.movies[index] })
    console.log(this.state.movies[index])
  }

  render() {
    if (this.state.movies == null) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Loading, please wait...</Text>
        </View>
      );
    }
    var movieListItems = this.state.movies.map(
      function (movie, index) {
        return (
          <TouchableHighlight underlayColor="lightgray" key={index} onPress={() => this.movieListItemPressed(index)}>
            <MoviesListItem movie={movie} key={index}/>
          </TouchableHighlight>
        );
      }.bind(this)
    );
    return <ScrollView>{movieListItems}</ScrollView>;
  }
}

export default MoviesList;
