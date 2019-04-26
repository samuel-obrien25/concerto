import React, { useState } from 'react';
import SplashScreen from './SplashScreen';
import Dashboard from './Dashboard';
import SignInScreen from './SignInScreen';
import Slide from '../Utilities/Slide';
import styled from 'styled-components';

const StyledScreenHandler = styled.main`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
`;
function ScreenHandler(props) {
    const [isSplashActive, setIsSplashActive] = useState(true);
    const {activeDatabase, activeUser, isSignedIn} = props;

    //Checks if user props.isSignedIn === true.
    //If true, render null
    //If not, render SignInScreen.js
    function authCatchUp(){
        let signInScreen;
            if (isSignedIn) {
                signInScreen = null;
                setTimeout(() => {
                    setIsSplashActive(false);   
                }, 2000);
            } else {
                    signInScreen = <SignInScreen isSignedIn={false} />
            }
            return signInScreen;
    };

    //Function that handles the logic for displaying the Dashboard.js.
    //If isSplashActive state === true, return null.
    //Else, return Dashboard.js
    function handleDashboard(){
        let dashboard =                 
            <Slide inOut='in' animDelay='0s' animDuration='1s' animFillMode='forwards' isForText={false} fullscreen={true}>
                   <Dashboard activeUserData={activeUser} activeDatabase={activeDatabase} />
            </Slide>;
            
            if(isSplashActive){
                return null
            } else {
                return dashboard;
            }
    }

    return (
        <StyledScreenHandler>
            <Slide inOut={isSplashActive ? 'in' : 'out'} animDelay='0s' animDuration='1s' animFillMode='forwards' isForText={false} fullscreen={true} unmount={isSplashActive ? false : true}>
                <SplashScreen>
                    <div>{authCatchUp()}</div>
                </SplashScreen>
            </Slide>
           {handleDashboard()}
        </StyledScreenHandler>
    )
}
export default ScreenHandler;
