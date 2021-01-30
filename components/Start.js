import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

export default class Start extends React.Component {
 constructor(props) {
   super(props);
   this.state = { text: '' };
}   
     
render() {
return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        placeholder='Enter Name'
      />          
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
      <Button
        title="Go to chat room"
        onPress={() => this.props.navigation.navigate('Chat')}
      />
      <Text>You wrote: {this.state.text}</Text>
    </View>
    );
  };
}
