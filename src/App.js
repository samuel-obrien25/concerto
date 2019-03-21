import React, { useEffect, useState } from 'react';
import SplashScreen from './Screens/SplashScreen';
import SignInScreen from './Screens/SignInScreen';
import NavDrawer from './Components/Menu/NavDrawer';

import styled from 'styled-components';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

const StyledMain = styled.main`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;
function App() {
  const [activeUser, setActiveUser] = useState(null)
  const user = firebase.auth().currentUser;

  useEffect( () => {
    if(user){
      setActiveUser(user);
    }
  }
);
  if (activeUser) {
    return (
      <StyledMain>
        <SplashScreen loggedIn={true} >
        <NavDrawer userData = {activeUser} />
        </SplashScreen>
      </StyledMain>
    );
  } else {
    return (
      <StyledMain>
        <SplashScreen loggedIn={false} >
          <SignInScreen />
        </SplashScreen>
      </StyledMain>
    )
  }
}


export default App;
