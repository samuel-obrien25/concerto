import React, { useEffect, useState } from 'react';
import SlideIn from '../Utilities/SlideIn';
import SlideOut from '../Utilities/SlideOut';

import styled from 'styled-components';
import SignInScreen from './SignInScreen';

//#region Styles
const StyledSplashScreen = styled.section`
    position: fixed;
    left: 0;
    width: 100%;
    height: 100vh;
    background:linear-gradient(to top left, #FDC830, #F37335);
    display: flex;
    flex-direction: column;
`;

// #endregion
function SplashScreen(props){

    if(props.loggedIn){
        return (
            <SlideOut animDelay="0s" animDuration=".75s" animFillMode="forwards" isForText="false" >
                <StyledSplashScreen loggedIn = {props.loggedIn}>
                    {props.children}
                </StyledSplashScreen>
            </SlideOut>
        );
    } else {
        return (
            <SlideIn animDelay="0s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText="false" >
                <StyledSplashScreen loggedIn = { props.loggedIn } >
                    {props.children}
                </StyledSplashScreen>
            </SlideIn>
        );
     }
    }

export default SplashScreen;
