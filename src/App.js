import React, { useEffect, useState } from 'react';
import SplashScreen from './Screens/SplashScreen';
import SignInScreen from './Screens/SignInScreen';

import NavDrawer from './Components/Menu/NavDrawer';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';

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
      <main>
        <SplashScreen loggedIn={true} />
        <NavDrawer userData = {activeUser} />
      </main>
    );
  } else {
    return (
      <main>
        <SignInScreen />
        <SplashScreen loggedIn={false} />
      </main>
    )
  }
}


export default App;
