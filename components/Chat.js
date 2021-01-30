import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

// Background image explained on https://reactnative.dev/docs/imagebackground
const image = require("../assets/background-image.png");

// Chat component also exported
export default class Chat extends React.Component {
// Shows username in navigator, along with color chosen
  render() {
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;
    let color = this.props.route.params.color;
    this.props.navigation.setOptions({ title: name });

    // Styling and background color chosen, uses flexbox
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'this.state.color' }}>
        <ImageBackground source={image} style={styles.image}></ImageBackground>
        {/* Back button */}
      <Button
        title="Go to Start"
        onPress={() => this.props.navigation.navigate('Start')}
      />      
      </View>
    );
  }
}    
// styling for image background
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

