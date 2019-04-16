import React, { useState } from 'react';
import SplashScreen from './SplashScreen';
import Dashboard from './Dashboard';
import SignInScreen from './SignInScreen';
import Slide from '../Utilities/Slide';

function ScreenHandler(props) {
    const [isSplashActive, setIsSplashActive] = useState(true);
    const {activeDatabase, activeUser, isSignedIn} = props;

    //Checks if user props.isSignedIn === true.
    //If true, render null
    //If not, render SignInScreen.js
    function authCatchUp(){
        let signInScreen;
            if (isSignedIn) {
                console.log('check');
                signInScreen = null;
                    setIsSplashActive(false);
            } else {
                signInScreen = <SignInScreen />
            }
            return signInScreen;
    };

    //Function that handles the logic for displaying the Dashboard.js.
    //If isSplashActive state === true, return null.
    //Else, return Dashboard.js
    function handleDashboard(){
        let dashboard =                 
            <Slide inOut='in' animDelay="0s" animDuration="1s" animFillMode="forwards" isForText={false} fullscreen={true}>
                   <Dashboard activeUserData={activeUser} activeDatabase={activeDatabase} />
            </Slide>;
            
            if(isSplashActive){
                return null
            } else {
                return dashboard;
            }
    }

    return (
        <div>
            <Slide inOut={isSplashActive ? "in" : "out"} animDelay="0s" animDuration="1s" animFillMode="forwards" isForText={false} fullscreen={true}>
                <SplashScreen>{ setTimeout(() => {
                    authCatchUp()
                }, 1000) }</SplashScreen>
            </Slide>
           {handleDashboard()}
        </div>
    )
}
export default ScreenHandler;
