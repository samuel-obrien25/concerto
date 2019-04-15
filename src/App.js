import React, { useState } from 'react';
import firebase from 'firebase';
import ScreenHandler from './Screens/ScreenHandler';

function App(props) {
  //State placeholder for signed in user data
  const [activeUser, setActiveUser] = useState(null);

  //State placeholder for logic that checks if the user is logged in
  const [isSignedIn, setIsSignedIn] = useState();

  //State placeholder for Database reference
  const [activeDatabase, setActiveDatabase] = useState(null);

    //Observer that checks if user is signed in
    firebase.auth().onAuthStateChanged(function (user) {
      //if User is signed in...
      if (user) {
        // Sets the active user's data to activeUser
        setActiveUser(user);
        // Sets the isSignedIn state to true
        setIsSignedIn(true);
        // Sets the activeDatabase to the database
        setActiveDatabase(firebase.database());
      } else { return }
    });

    return (
      <ScreenHandler activeDatabase = {activeDatabase} activeUser = {activeUser} isSignedIn = { isSignedIn }/>
    )
}
export default App;
