import React, { useEffect, useState } from 'react';
import Slide from '../Utilities/Slide';
import Icon from '../Components/Icons/Icon';
import SignInScreen from '../Screens/SignInScreen';

import styled from 'styled-components';
import AppTitle from '../Components/Text/AppTitle';

//#region Styles
const StyledSplashScreen = styled.section`
    position: fixed;
    left: 0;
    width: 100%;
    height: 100vh;
    background:linear-gradient(to top left, #FDC830, #F37335);
    display: flex;
    flex-direction: column;
    z-index: 9000;
`;

// #endregion
function SplashScreen(props) {
    const [isSignedIn, setIsSignedIn] = useState(props.isSignedIn);

    const handleSignInStatusChange = () => {
        setTimeout(() => {
            props.isSignedIn ? setIsSignedIn(true) : setIsSignedIn(false);
        }, 5000);
    }

    if (isSignedIn) {
        return (
            <Slide inOut="out" animDelay="0s" animDuration="5s" animFillMode="forwards" animStyle="fullScreen" isForText={false} >
                <StyledSplashScreen>
                    <Slide inOut="out" animDelay="0s" animDuration="2s" animFillMode="forwards" isForText={false}>
                        <AppTitle text="CONCERTO" inOut="out" />
                    </Slide>
                    <Icon />
                </StyledSplashScreen>
            </Slide>
        )
    }

    return (
        <Slide inOut="in" animDelay="2s" animDuration=".75s" animFillMode="forwards" animStyle="fullScreen" isForText={false} >
            <StyledSplashScreen isSignedIn={props.isSignedIn}>
                <Slide inOut="in" animDelay="0s" animDuration="2s" animFillMode="forwards" isForText={false}>
                    <AppTitle text="CONCERTO" inOut="in" />
                </Slide>
                <Icon />
            </StyledSplashScreen>
        </Slide>
    );
}
export default SplashScreen;
