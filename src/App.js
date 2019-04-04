import React, { useEffect, useState } from 'react';
import SplashScreen from './Screens/SplashScreen';
import Dashboard from './Screens/Dashboard';
import styled from 'styled-components';
import firebase from 'firebase';
// #region styles
const StyledMain = styled.main`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;
// #endregion styles

function App(props) {
  //State placeholder for signed in user data
  const [activeUser, setActiveUser] = useState(null);

  //State placeholder for logic that checks if the user is logged in
  const [isSignedIn, setIsSignedIn] = useState(props.isSignedIn);

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
    if(isSignedIn){
      return (
        <StyledMain>
          <Dashboard activeUserData= { activeUser } activeDatabase= { activeDatabase }/>
        </StyledMain>
      )
    } else{
      return (
        <StyledMain>
          <SplashScreen isSignedIn = { isSignedIn } />
        </StyledMain>
        )
    }
}
export default App;
