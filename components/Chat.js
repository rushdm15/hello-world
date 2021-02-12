import React from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

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
      apiKey: "AIzaSyCEyxlPyi8EcmYhmv-N1XCX7OFlMzSH1dM",
      authDomain: "chat-app-19f48.firebaseapp.com",
      projectId: "chat-app-19f48",
      storageBucket: "chat-app-19f48.appspot.com",
      messagingSenderId: "982800756346",
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
  addMessage() {
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
    }), () => {
      this.saveMessages();
    });
  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

renderInputToolbar(props) {
  if (this.state.isConnected == false) {
  } else {
    return(
      <InputToolbar
      {...props}
      />
    );
  }
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

  renderCustomView (props) {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
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
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          // renderInputToolbar={this.renderInputToolbar}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderActions={this.renderActions}
          renderCustomView={this.renderCustomView}
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
    this.getMessages();
    // create a reference to the active user's documents (messages)
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
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
      } else {
        console.log('offline');
      }
    });
  }

  componentWillUnmount() {
    // Stop receiving updates from collection
    this.authUnsubscribe();
    // Stop listening to authentication
    this.unsubscribeChatUser();
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };
}  

