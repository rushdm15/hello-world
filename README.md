# hello-world

Description
A chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.  Built using React Native, a framework for building Android and iOS apps that only requires one codebase, as well as using Expo and Google Firestore.

Key Features
● A page where users can enter their name and choose a background color for the chat screen before joining the chat.
● A page displaying the conversation, as well as an input field and submit button.
● The chat must provide users with two additional communication features: sending images and location data.
● Data gets stored online and offline.

Chat Deliverables
● Set up your development environment to work with React Native and Expo. 
-Command Install line npm install expo-cli --global 
-To create a new project  expo init  plus file name
-In terminal, select blank template. Then use expo start to view project in localhost
-To view project on external device, scan given QR code
-To view project on [Android emulator](https://docs.expo.io/workflow/android-studio-emulator/), press ‘a’ in terminal or select Android option in localhost
● Create the app’s layout using native UI components and style the start screen
● Build the chat screen and the chat functionality with the Gifted Chat library.
● Authenticate users anonymously with Firebase (https://firebase.google.com).
● Store conversations in the Firestore Database.
-To install npm install --save firebase@7.9.0 
● Store chats locally using asyncStorage so they’re available offline.
-To install React Native’s storage system expo install @react-native-community/async-storage 
● Authenticate users and store chat messages in Firestore as well as on the device when users are online.
● Retrieve locally stored messages and disallow the creation of new messages when users are offline.
● Let users pick an image from the device’s library and take pictures with the device’s camera app.
● Store images in Google Firebase Cloud Storage and send images via Gifted Chat.
● Let users send their current location in a map view via Gifted Chat.
● Apply accessibility considerations to app design and development.
