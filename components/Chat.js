import React from 'react';
import { View, Text, Button } from 'react-native';

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
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
        {/* Back button */}
      <Button
        title="Go to Start"
        onPress={() => this.props.navigation.navigate('Start')}
      />      
      </View>
    );
  }
}    


