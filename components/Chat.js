import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const image = require("../assets/background-image.png");

export default class Chat extends React.Component {

  render() {
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;

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
  };
}
