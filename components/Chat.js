import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Button, Platform, KeyboardAvoidingView } from 'react-native';
// import * as firebase from "firebase" 
// import "@firebase/firestore"

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
  addMessages() {
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    })
    
    )
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
      messages: [],
    }); 
      // create a reference to the active user's documents (shopping lists)
      // this.referenceChatMessages = firebase.firestore().collection('messages');
      // .where("uid", "==", this.state.uid);
      // listen for collection changes for current user 
      this.unsubscribeChatUser = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    // Stop receiving updates from collection
    this.authUnsubscribe();
    // Stop listening to authentication
    this.unsubscribeChatUser();
  }
}  

