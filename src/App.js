import React, { Component, useEffect, useState } from 'react';
import SplashScreen from './Screens/SplashScreen';
import NavDrawer from './Components/Menu/NavDrawer';

function App() {
  //Global State
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    const userDataStore = window.localStorage.getItem('dataStore');
    
    try {
      if(userDataStore.length < 1) throw new Error("user data store undefined");
    }
    catch(error) {
      console.log(error);
    }
    finally {
      console.log(userDataStore);
    }
  });
  
  return (
    <div>
      <SplashScreen />
      <NavDrawer />
    </div>
  );
}


export default App;
