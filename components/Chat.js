import React from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

// Google Firebase
// const firebase = require('firebase');
// require('firebase/firestore');

// Chat component also exported
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
      uid: 0,
      isConnected: false,
      image: null
    };

    const firebaseConfig = {
      apiKey: "AIzaSyCEyxlPyi8EcmYhmv-N1XCX7OFlMzSH1dM",
      authDomain: "chat-app-19f48.firebaseapp.com",
      databaseURL: "https://chat-app-19f48-default-rtdb.firebaseio.com",
      projectId: "chat-app-19f48",
      storageBucket: "chat-app-19f48.appspot.com",
      messagingSenderId: "982800756346",
      appId: "1:982800756346:web:b5ecea4623e9f780c795c3",
      measurementId: "G-8MSPLCJWVG"
    };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
    }

    // create a reference to the active user's documents (shopping lists)
    this.referenceChatMessages = firebase.firestore().collection('messages');
    // .where("uid", "==", this.state.uid);

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

  componentDidMount() {
    // Check user connection
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
    // create a reference to the active user's documents (messages)
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      //Add user to state
      else {
        this.setState({
        isConnected: true,
        user: {
          _id: user.uid,
          name: this.props.route.params.name,
          avatar: 'https://placeimg.com/140/140/any' 
        },
      messages: [],
      }); 
      // listen for collection changes for current user 
      this.unsubscribeChatUser = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
      }
    });
  } else {
      console.log('offline');
      this.getMessages();
      this.setState({ isConnected: false });
      Alert.alert(
        'No internet connection detected | Unable to send messages'
      );
     }
    });
    // calling the onSnapshot function to receive the updated data
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  componentWillUnmount() {
    // Stop listening to authentication
    this.unsubscribeChatUser();
    // Stop receiving updates from collection
    this.authUnsubscribe();
  }

  onSend(messages = []) {
    // setState is called with previousState as the parameter -> reference to the component's
    // state at the time the change is applied.
    this.setState(previousState => ({
      // the append function by Gifted chat appends the new message to the message obj.
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
      this.saveMessages();
    });
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
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || '',
        location: data.location || null,
      });
    });
    this.setState({ messages });
  }

  // add a new list to the collection
  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      uid: this.state.uid,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
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

  /**
 * hides inputbar when offline
 * @function renderInputToolbar
 */  
renderInputToolbar(props) {
  if (this.state.isConnected == false) {
  } else {
    return( <InputToolbar {...props} /> );
  }
}

  /**
   * displays the communication features
   * @function renderCustomActions
   */
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  // custom map view
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
    const { name, color } = this.props.route.params;
    const { messages } = this.state;

    // Styling and background color chosen, uses flexbox
    return (
      <View style={{flex:1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={messages}
          onSend={messages => this.onSend(messages)}
          renderActions={this.renderCustomActions}
          renderCustomView={this.renderCustomView}
          image={this.state.image}
          user={{
            _id: this.state.uid,
            avatar: 'https://placeimg.com/140/140/any',
            name: name,
          }}
        /> 
        {/* android keyboard error */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }

      </View>
    );
  }
}  

