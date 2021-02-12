import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { render } from 'react-dom';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default class CustomActions extends React.Component {

  //Pick an image from the library
  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));
 
      if (!result.cancelled) {
        this.setState({
          image: result
        });  
      }
 
    }
  }

  // Take a photo
  takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, CAMERA);
    if(status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(error));

      if (!result.cancelled) {
        this.setState({
          image: result
        });  
      }

    }
  }

  // Get my location
  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});
 
      if (result) {
        this.setState({
          location: result
        });
      }
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
        <StatusBar style="auto" />
          <Button
            title="Pick an image from the library"
            onPress={this.pickImage}
          />

          <Button
            title="Take a photo"
            onPress={this.takePhoto}
          />

        {this.state.image &&
          <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 200 }} />}

        <Button
          title="Get my location"
          onPress={this.getLocation}
        />

        {this.state.location &&
          <MapView
            style={{width: 300, height: 200}}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />}
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  }

  onActionPress = () => {
    const options = [
      'Choose From Library', 
      'Take Picture', 
      'Send Location', 
      'Cancel'
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return;
          case 1:
            console.log('user wants to take a photo');
            return;
          case 2:
            console.log('user wants to get their location');
          default:
        }
      },
    );
  };

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

    /**
   * Upload images to firebase
   * @function uploadImageFetch
   * @async
   */
  uploadImageFetch = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);

    blob.close();

    return await snapshot.ref.getDownloadURL();
  };
}  

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
   };

const styles = StyleSheet.create({
 container: {
   width: 26,
   height: 26,
   marginLeft: 10,
   marginBottom: 10,
 },
 wrapper: {
   borderRadius: 13,
   borderColor: '#b2b2b2',
   borderWidth: 2,
   flex: 1,
 },
 iconText: {
   color: '#b2b2b2',
   fontWeight: 'bold',
   fontSize: 16,
   backgroundColor: 'transparent',
   textAlign: 'center',
 },
});