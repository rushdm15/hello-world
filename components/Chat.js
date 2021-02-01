import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Text, Button, Platform, KeyboardAvoidingView } from 'react-native';

// Chat component also exported
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }
  
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
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      /> 
      </View>
    );
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ],
    })
  }
}    


