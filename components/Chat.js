import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View,Text, Button, Platform, KeyboardAvoidingView } from 'react-native';

// Google Firebase
const firebase = require('firebase');
require('firebase/firestore');

// Chat component also exported
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
    };

    const firebaseConfig = {
      apiKey: "AIzaSyDYEnlD4_FhhQhI9wPwgN6Xf2rdYlELf74",
      authDomain: "shopping-725a2.firebaseapp.com",
      projectId: "shopping-725a2",
      storageBucket: "shopping-725a2.appspot.com",
      messagingSenderId: "393972749114",
      }

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }
  }
  
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
  }

  // add a new list to the collection
  addList() {
    this.referenceChatMessages.add({
      name: 'TestList',
      items: ['eggs', 'pasta', 'veggies'],
      uid: this.state.uid, 
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
// color of text bubble
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
      <View style={{flex:1, backgroundColor: color }}>
          {/* Back button */}
        {/* <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate('Start')}
        />      */}
        {/* provides the entire interface, text input field, speech bubbles, “Send” button, */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        /> 

        {/* android keyboard error */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }

        <button
          onPress={() => {
            this.addList();
          }}
          title = "Add something"
        />
      </View>
    );
  }

  componentDidMount() {
    // create a reference to the active user's documents (shopping lists)
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    this.setState({
      uid: user.uid,
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
    }); 
      // create a reference to the active user's documents (shopping lists)
      this.referenceChatMessagesUser = firebase.firestore().collection('shoppinglists').where("uid", "==", this.state.uid);
      // listen for collection changes for current user 
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}  


