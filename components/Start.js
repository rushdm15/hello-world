import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, 
  ImageBackground } from 'react-native';

// Background image explained on https://reactnative.dev/docs/imagebackground
const image = require("../assets/background-image.png");

// Start component also exported
export default class Start extends React.Component {
 constructor(props) {
   super(props);
   this.state = { 
     name: '',
     color: ''
   };
}   
     
render() {
return (
  // textbox for username with styling
    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
      <ImageBackground source={image} style={styles.image}></ImageBackground>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(name) => this.setState({name})}
        value={this.state.name}
        placeholder='Enter Name'
      />         
      {/* color options for user to choose explained on https://reactnative.dev/docs/touchableopacity  */}
        <Text>Choose a color for your Chat: </Text>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.box1}
            onPress={() => {this.setState({color: '#cfcd90'})}}
          >
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box2}
            onPress={() => {this.setState({color: '#cfab90'})}}
          >
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box3}
            onPress={() => {this.setState({color: '#a59d97'})}}
          >
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box4}
            onPress={() => {this.setState({color: '#95a6c1'})}}
          >
          </TouchableOpacity>
        </View>
        {/* responsive color option for color chosen */}
        <View style={{ 
          backgroundColor: this.state.color, 
          borderStyle: 'solid', 
          borderWidth: 1, 
          borderColor: 'gray', 
          margin: 10, 
          marginBottom: 15, 
          width: 50, 
          height: 50, 
          borderRadius: 25 }}
        >
        </View>
        {/* button to chat room*/}
      <Button
        title="Go to chat room"
        onPress={() => this.props.navigation.navigate('Chat', { 
          name: this.state.name, color: this.state.color})}
      />
    </View>
    );
  };
}
// styles for color options, circle shapes
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 200,
    margin: 10
  },
  box1: {
    flex: 1,
    backgroundColor: '#cfcd90',
    height: 50,
    borderRadius: 25,
    right: 25
  },
  box2: {
    flex: 1,
    backgroundColor: '#cfab90',
    borderRadius: 25,
    right: 10
  },
  box3: {
    flex: 1,
    backgroundColor: '#a59d97',
    borderRadius: 25,
    left: 5
  },
  box4: {
    flex: 1,
    backgroundColor: '#95a6c1',
    borderRadius: 25,
    left: 20
  },
});

// // styling for image background
//   container: {
//     flex: 1,
//     flexDirection: "column"
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center"
//   },
//   text: {
//     color: "white",
//     fontSize: 42,
//     fontWeight: "bold",
//     textAlign: "center",
//     backgroundColor: "#000000a0"
//   }
// });