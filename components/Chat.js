import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const image = require("../assets/background-image.png");

export default class Chat extends React.Component {

  render() {
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;
    let color = this.props.route.params.color;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'color' }}>
        <ImageBackground source={image} style={styles.image}></ImageBackground>
      <Button
        title="Go to Start"
        onPress={() => this.props.navigation.navigate('Start')}
      />      
      </View>
    );
  }
}    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});

