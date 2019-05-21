import React, { useState } from 'react';
import SplashScreen from './SplashScreen';
import Dashboard from './Dashboard';
import SignInScreen from './SignInScreen';
import Slide from '../Utilities/Slide';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//#region styles
const StyledScreenHandler = styled.main`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
`;

const AuthWrapper = styled.div`
    position: absolute;
    z-index: 9999;
    width: 100%;
    height: 100vh;
    margin: auto;
    display: flex;
`;
//#endregion

function ScreenHandler(props) {
    const [isSplashActive, setIsSplashActive] = useState(true);
    const { activeDatabase, activeUser, isSignedIn } = props;

    /**
     * Checks if user props.isSignedIn === true.
     * If true, render null
     * If not, render SignInScreen.js
     */
    function authCatchUp(){
        
        let signInScreen;
            if (isSignedIn) {
                signInScreen = null;
    // BUG: Setting timeout prevents infinite rerenders. Do not know why.
    
    // Set delay to how long the SplashScreen should render for
                setTimeout(() => {
                    setIsSplashActive(false);   
                }, 2000);
            } else {
                    signInScreen = <SignInScreen isSignedIn={false} />
            }
                return signInScreen;
    };

    /**
     * Function that handles the logic for displaying the Dashboard.js.
     * If isSplashActive state === true, return null.
     * Else, return Dashboard.js
     */
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

    /**
     * BUG: I cannot figure out how to stop the splashscreen from re rendering once isSignedIn is passed.
     * Adding an animation delay of .5s allows the prop to pass without triggering a rerender.
     */ 
    return (
        <StyledScreenHandler>
            <Slide inOut={isSplashActive ? 'in' : 'out'} animDelay='.5s' animDuration='1s' animFillMode='forwards' isForText={false} fullscreen={true} unmount={isSplashActive ? false : true}>
                <AuthWrapper>{authCatchUp()}
                    </AuthWrapper>
                <SplashScreen/>
            </Slide>
           {handleDashboard()}
        </StyledScreenHandler>
    )
}

//#region proptypes
ScreenHandler.propTypes = {
    activeDatabase: PropTypes.object,
    activeUser: PropTypes.object,
    isSignedIn: PropTypes.bool
}
//#endregion
export default ScreenHandler;
