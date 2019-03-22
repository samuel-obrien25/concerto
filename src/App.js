import React, { useEffect, useState } from 'react';
import SplashScreen from './Screens/SplashScreen';
import SignInScreen from './Screens/SignInScreen';

import styled from 'styled-components';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';
import Icon from './Components/Icons/Icon';
import Headline from './Components/Text/Headline';

const StyledMain = styled.main`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    if(user){
      setActiveUser(user);
      setIsLoggedIn(true)
    }
  }
);

  return (
    <StyledMain>
      <SplashScreen loggedIn = { isLoggedIn }>
        <Headline text = { user } />
        <Icon />
        <SignInScreen activeUser = { activeUser }/>
      </SplashScreen>
    </StyledMain>
  )
}

export default App;
