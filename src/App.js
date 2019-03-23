import React, { useEffect, useState } from 'react';
import SplashScreen from './Screens/SplashScreen';

import styled from 'styled-components';
import firebase from 'firebase';

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
  const user = firebase.auth().currentUser;

  useEffect(() => {
        setActiveUser(user);
        setIsSignedIn(props.isSignedIn);
    }
  );

if(isSignedIn) {
  return (
    <StyledMain>
        <SplashScreen isSignedIn = {props.isSignedIn} />
    </StyledMain>

  )
}else {
  return (
    <StyledMain>
        <SplashScreen isSignedIn = {props.isSignedIn} />
    </StyledMain>
  )
}
}

export default App;
