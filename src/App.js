import React, { useEffect, useState } from 'react';
import SplashScreen from './Screens/SplashScreen';
import Dashboard from './Screens/Dashboard';

import styled from 'styled-components';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';

const StyledMain = styled.main`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

function App(props) {
  const [activeUser, setActiveUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(props.isSignedIn);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setActiveUser(user);
        setIsSignedIn(true);
      } else {
      return
      }
    });
    }
  );

  

if(isSignedIn) {
  return (
    <StyledMain>
        <SplashScreen isSignedIn = { isSignedIn } />
        <Dashboard activeUser = { activeUser } />
    </StyledMain>
  )
}else {
  return (
    <StyledMain>
        <SplashScreen isSignedIn = { isSignedIn } />
    </StyledMain>
  )
}
}

export default App;
