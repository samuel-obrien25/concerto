import React, { useState } from 'react';
import SplashScreen from './SplashScreen';
import Dashboard from './Dashboard';
import SignInScreen from './SignInScreen';
import Slide from '../Utilities/Slide';

function ScreenHandler(props) {
    const [isSplashActive, setIsSplashActive] = useState(true);
    const {activeDatabase, activeUser, isSignedIn} = props;

    //function that waits 5 seconds to let data catch up from Firebase.
    //Then checks if user props.isSignedIn === true.
    //If true, render null
    //If not, render SignInScreen.js
    function authCatchUp(){
        let signInScreen;
        setTimeout(() => {
            if(isSignedIn){
                signInScreen = null;
                setIsSplashActive(false);
            } else {
                signInScreen = <SignInScreen isSignedIn={isSignedIn} />
            }
            return signInScreen;
        }, 5000);
    }

    //Function that handles the logic for displaying the Dashboard.js.
    //If isSplashActive state === true, return null.
    //Else, return Dashboard.js
    function handleDashboard(){
        let dashboard =                 
            <Slide inOut='in' animDelay="0s" animDuration="1s" animFillMode="forwards" isForText={false} fullscreen={true}>
                   <Dashboard activeUserData={activeUser} activeDatabase={activeDatabase} />
            </Slide>;
            if(isSplashActive) return null
            else return dashboard;
    }

//Why is this re-rendering FIVE TIMES

console.log(isSignedIn);

    return (
        <div>
            <Slide inOut={isSplashActive ? "in" : "out"} animDelay="0s" animDuration="1s" animFillMode="forwards" isForText={false} fullscreen={true}>
                <SplashScreen> {authCatchUp()}</SplashScreen>
            </Slide>
           {handleDashboard()}
        </div>
    )
}
export default ScreenHandler;
