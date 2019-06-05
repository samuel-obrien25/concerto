import React, { useState } from 'react';
import firebase from 'firebase';
import Slide from './Utilities/Slide';
import Dashboard from './Screens/Dashboard';
import SignInScreen from './Screens/SignInScreen';
import SplashScreen from './Screens/SplashScreen';
import styled from 'styled-components';

const FlexWrapper = styled.div`
    position: absolute;
    z-index: 9999;
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
`;
/**
 * App.js gets the Auth state from firebase
 * Then it sets the ActiveUser state
 * And sets the isSignedIn State
 * 
 * If no user is signed in, return <SignInScreen>
 * 
 * If user is signed in, return <Dashboard> and pass activeUserData
 */

function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState();

    //Observer that checks if user is signed in
    firebase.auth().onAuthStateChanged(function (user) {
      //if User is signed in...
      if (user) {
        // Sets the active user's data to activeUser
        setActiveUser(user);
        // Sets the isSignedIn state to true
        setIsSignedIn(true);
      } else { return }
    });

    if(!isSignedIn){
      return (
        <Slide inOut='in' animDelay='2s' animDuration='1s' animFillMode='forwards' isForText={false} fullscreen={true}>
          <FlexWrapper>
            <SignInScreen isSignedIn={false} />
          </FlexWrapper>
          <SplashScreen />
        </Slide>
      )
    } else {
      return <Dashboard activeUserData={activeUser} />;
    }
}
export default App;