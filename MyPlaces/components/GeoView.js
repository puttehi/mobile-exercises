import React, { Component, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  Title,
  Left,
  Right,
  Body,
  View,
  Text,
  Icon,
} from "native-base";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

import Dialog from "react-native-dialog";
import { Form, Item, Input, Button } from "native-base";

export default class GeoView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationErrorMsg: null,
      locations: props.locations,
      region: props.region,
      modalVisible: false,
    };
    this.addLocations = props.add;
    this.removeLocation = props.remove;
    this.cityToSearch = "";
    this.infoForCity = "";
  }

  toggleDialog = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
    if (!this.state.modalVisible){ // If user closed the dialog, reset inputted data
      this.cityToSearch = "";
      this.infoForCity = "";
    }
  };
  cancelPlace = () => {
    this.toggleDialog();
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>My Places</Title>
          </Body>
          <Right />
        </Header>

        <Content contentContainerStyle={{ flex: 1 }}>
          <View>
            <Dialog.Container
              visible={this.state.modalVisible}
              style={{ justifyContent: "center" }}
            >
              <Dialog.Title>Add a new place</Dialog.Title>
              <Form>
                <Item>
                  <Input
                    onChangeText={(text) => (this.cityToSearch = text)}
                    label="City"
                    placeholder="Enter place"
                    clearButtonMode="always"
                    clearTextOnFocus={true}
                  />
                </Item>
                <Item>
                  <Input
                    onChangeText={(text) => (this.infoForCity = text)}
                    label="Info"
                    placeholder="Enter information"
                    clearButtonMode="always"
                    clearTextOnFocus={true}
                  />
                </Item>
              </Form>
              <Dialog.Button label="Cancel" onPress={this.cancelPlace} />
              <Dialog.Button
                label="Add"
                onPress={() => {
                  this.props.add({
                    name: this.cityToSearch,
                    info: this.infoForCity,
                  });
                  this.toggleDialog();
                }}
              />
            </Dialog.Container>
          </View>
          <View>
            <MapView
              //London as default view
              initialRegion={{
                latitude: 51.509865,
                longitude: -0.118092,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              region={this.props.region}
              style={styles.mapView}
            >
              {this.props.locations.map((location, index) => (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title={location.name}
                  description={location.info}
                  key={location.name}
                  index={index}
                >
                  <MapView.Callout onPress={() => {this.props.remove(index)}}>
                    <View style={{flex: 1}}>
                      <Text style={styles.markerTitle}>{location.name}</Text>
                      <Text style={styles.markerBody}>{location.info}</Text>
                    </View>
                  </MapView.Callout>
                </Marker>
              ))}
            </MapView>
          </View>
          <View style={styles.buttonCallout}>
            <Button rounded primary onPress={this.toggleDialog}>
              <Icon name="add" ios="ios-add" android="md-add" />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    width: "100%",
    height: "100%",
  },
  buttonCallout: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  markerTitle:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  markerBody:{
    fontSize: 12,
    fontStyle:'italic'
  }
});
