import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import ReactPlayer from "react-player/youtube";
import { ScrollView } from "react-native-gesture-handler";
export default class MovieDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videourl: null,
      route: props.route,
      movie: null,
      genresString: "",
      directors: null,
      writers: null,
      cast: null,
    };
  }
  componentDidMount() {
    this.mutateToFullMovieDetails(this.props.route.params.movie);
    //this.setVideos(this.state.movie);
  }
  mutateToFullMovieDetails = (movie) => {
    let APIKEY = "131a5099b093bc6be5d7667c276219c0";
    let BASEURL = `https://api.themoviedb.org/3/movie/${movie.id}`;
    let url = `${BASEURL}?api_key=${APIKEY}&append_to_response=credits`;
    console.log("fetching movie from url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json != undefined || json != null) {
          this.setState({ movie: json });
        }
        //return json.results
        //console.log("Got full movie data: " + JSON.stringify(json));
        this.setVideoUrl(json);
        this.setMovieGenres(json);
        this.setCrew(json);
        this.setCast(json);
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  setCrew = (movie) => {
    var directors = [];
    var writers = [];
    movie.credits.crew.forEach(function (entry) {
      if (entry.job === "Director") {
        directors.push(entry.name);
      }
      if (entry.job === "Writer") {
        writers.push(entry.name);
      }
    });
    console.log("Director(s): " + directors.join(", "));
    console.log("Writer(s): " + writers.join(", "));
    this.setState({ directors: directors, writers: writers });
  };
  setCast = (movie) => {
    var cast = [];
    movie.credits.cast.forEach(function (entry) {
      let fullDescription = entry.name + " as " + entry.character;
      cast.push(fullDescription);
    });
    console.log("Cast: " + cast.join(", "));
    this.setState({ cast: cast });
  };
  setVideoUrl = (movie) => {
    let APIKEY = "131a5099b093bc6be5d7667c276219c0";
    let BASEURL = `https://api.themoviedb.org/3/movie/${movie.id}/videos`;
    let url = `${BASEURL}?api_key=${APIKEY}`;
    console.log("fetching videos from url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log("videos(" + json.results.length + "):" + json.results);
        json.results.forEach((video) => {
          console.log(video);
        });
        if (json.results[0] != undefined || json.results[0] != null) {
          this.setState({ videourl: json.results[0].key });
        }
        //return json.results
        console.log("Got video url: " + this.state.videourl);
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  setMovieGenres = (movie) => {
    let genres = "";
    movie.genres.map((genre, index) => {
      genres = genres.concat(genre.name);
      if (index != movie.genres.length - 1) {
        genres = genres.concat(", ");
      }
    });
    this.setState({ genresString: genres });
  };
  getImageOrVideoElement = (movie) => {
    const width = Math.round(Dimensions.get("window").width);
    const percentageFill = 0.35; // Image fills 35% of the container height-wise
    const height = width * 1.5 * percentageFill; // 3:4 aspect ratio = 1.5 multiplier

    const IMAGEPATH = "http://image.tmdb.org/t/p/w500";
    let imageurl;
    if (movie.backdrop_path != null) {
      imageurl = IMAGEPATH + movie.backdrop_path;
    } else {
      imageurl = "http://cdn.onlinewebfonts.com/svg/download_508601.png";
    }

    if (this.state.videourl == null) {
      console.log("no videos found returning image (backdrop_path)");
      return (
        <View style={styles.videoWrapper}>
          <Image
            source={{ uri: imageurl }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      );
    } else {
      console.log(
        "building video path from: " +
          this.state.movie +
          "(key: " +
          this.state.videourl +
          ")"
      );
      const VIDEOPATH = "https://youtube.com/watch?v=";
      // Hard-coded first key, should probably test the streams and find the working one or offer options
      let videourl = VIDEOPATH + this.state.videourl;
      return (
        <View style={styles.videoWrapper}>
          <ReactPlayer
            light={imageurl}
            url={videourl}
            width={"100%"}
            height={"100%"}
          />
        </View>
      );
    }
  };
  getCastElement = () => {
    if (this.state.cast == null) {
      console.log("returning null cast element");
      return <Text>null</Text>;
    } else {
      console.log("returning proper cast element");
      var castElements = this.state.cast.map(
        function (member, index) {
          let dividerIndex = member.indexOf(" as ") + 1;
          var actor = member.slice(0,dividerIndex)
          var character = member.slice(dividerIndex+3, member.length)
          return <View style={{ display: 'flex', flexDirection: 'row', paddingBottom:1 }}><Text style={styles.actorText}>{actor}as </Text><Text style={styles.characterText}>{character}</Text></View>;
        }.bind(this)
      );
      return (
        <View style={styles.castWrapper}>
          <Text style={styles.castHeader}>Cast:</Text>
          <ScrollView style={{ flexGrow: 0, borderWidth:1 }}>{castElements}</ScrollView>
        </View>
      );
    }
  };
  getWritingElement = () => {
    if (this.state.writers == null) {
      console.log("returning null writing element");
      return <Text>null</Text>;
    } else {
      console.log("returning proper writing element");
      var writerElements = this.state.writers.map(
        function (writer, index) {
          return <Text style={styles.scrollableText}>{writer}</Text>;
        }.bind(this)
      );
      return (
        <View style={styles.castWrapper}>
          <Text style={styles.castHeader}>Writing:</Text>
          <ScrollView style={{ flexGrow: 0, borderWidth:1 }}>{writerElements}</ScrollView>
        </View>
      );
    }
  };
  getDirectingElement = () => {
    if (this.state.directors == null) {
      console.log("returning null directing element");
      return <Text>null</Text>;
    } else {
      console.log("returning proper directing element");
      var directorElements = this.state.directors.map(
        function (director, index) {
          return <Text style={styles.scrollableText}>{director}</Text>;
        }.bind(this)
      );
      return (
        <View style={styles.castWrapper}>
          <Text style={styles.castHeader}>Directing:</Text>
          <ScrollView style={{ flexGrow: 0, borderWidth:1 }}>{directorElements}</ScrollView>
        </View>
      );
    }
  };
  render() {
    if (this.state.movie == null) {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Loading... Please wait.</Text>
        </View>
      );
    }
    return (
      <View style={styles.detailsView}>
        {
          this.getImageOrVideoElement(
            this.state.movie
          ) /* Should return image on mount and rerender as video if it was found in setVideos */
        }
        <View style={styles.textWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{this.state.movie.title}</Text>
            <Text style={styles.genres}>{this.state.genresString}</Text>
          </View>
          <View style={styles.detailsWrapper}>
            <View style={{ display: 'flex', flexDirection: 'row', paddingBottom:2 }}>
              <Text style={{fontSize:13, fontWeight:'bold'}}>Airs: </Text>
              <Text style={{fontSize:13, fontWeight:'bold'}}>{this.state.movie.release_date}</Text>
            </View>
            <Text style={styles.text}>{this.state.movie.overview}</Text>
            {this.getCastElement()}
            {this.getWritingElement()}
            {this.getDirectingElement()}
          </View>
        </View>
      </View>
    );
  }
}
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  image: {
    aspectRatio: 3 / 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    position: "absolute",
    bottom: 0,
  },
  genres: {
    fontStyle: "italic",
    fontSize: 12,
    position: "absolute",
    top: 0,
  },
  text: {
    fontSize: 14,
    flexWrap: "wrap",
  },
  scrollableText: {
    fontSize: 13,
    flexWrap: "wrap",
    borderWidth: 0,
  },
  actorText: {
    fontSize: 13,
    flexWrap: "wrap",
    borderWidth: 0,
  },
  characterText: {
    fontSize: 13,
    fontStyle: 'italic',
    flexWrap: "wrap",
    borderWidth: 0,
  },
  videoWrapper: {
    width: "100%",
    height: "35%",
  },
  detailsView: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    marginLeft: 5,
  },
  titleWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 25,
  },
  detailsWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: 25,
  },
  castWrapper: {
    borderWidth: 0,
    paddingTop: 5,
    flexGrow: 1,
  },
  castHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
