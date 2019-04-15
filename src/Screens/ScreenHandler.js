import React, { useState } from 'react';
import SplashScreen from './SplashScreen';
import Dashboard from './Dashboard';
import styled from 'styled-components';
import SignInScreen from './SignInScreen';
import Slide from '../Utilities/Slide';

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

function ScreenHandler(props) {
    const [isSplashActive, setIsSplashActive] = useState(true);
    const {activeDatabase, activeUser, isSignedIn} = props;

    function authCatchUp(){
        let signInScreen;
        //One second timeout to let Auth catch up from App.js. Otherwise the sign-in screen will flash.
        setTimeout(() => {
            if(isSignedIn){
                signInScreen = null;
                setIsSplashActive(false);
            } else {
                signInScreen = <SignInScreen isSignedIn={isSignedIn} />
            }
            return signInScreen
        }, 1000);
    }

    /*
    if(isSignedIn && isSplashActive) {

        setTimeout(() => {
            setIsSplashActive(false);
        }, 5000);

        return (
            <StyledMain>
                <Slide inOut={isSplashActive ? 'in' : 'out'} animDelay="0s" animDuration="1s" animFillMode="forwards" isForText={false} >
                    <SplashScreen isSignedIn={isSignedIn} />
                </Slide>
            </StyledMain>
        )
    } if(isSignedIn && !isSplashActive){
        return(
            <StyledMain>
                <Slide inOut='out' animDelay="0s" animDuration="1s" animFillMode="forwards" isForText={false} >
                    <SplashScreen isSignedIn={isSignedIn} />
                </Slide>
                <Slide inOut='in' animDelay="1s" animDuration="1s" animFillMode="forwards" isForText={false} >
                    <Dashboard activeUserData={activeUser} activeDatabase={activeDatabase} />
                </Slide>
            </StyledMain>
        )
    }
    if(!isSignedIn){
      return (
          <StyledMain>
              <Slide inOut={isSplashActive ? 'in' : 'out'} animDelay="0s" animDuration="1s" animFillMode="forwards" isForText={false} >
                  <SplashScreen isSignedIn={isSignedIn} />
              </Slide>
              <SignInScreen isSignedIn={isSignedIn} />
          </StyledMain>
      )
    } 
}
*/

    return(
        <Slide inOut={isSplashActive ? 'in' : 'out'} animDelay="0.25s" animDuration="1s" animFillMode="forwards" isForText={false}>
            <SplashScreen>
                {authCatchUp}
            </SplashScreen>
        </Slide>
    )
}
export default ScreenHandler;
