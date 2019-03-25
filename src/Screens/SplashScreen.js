import React, { useEffect, useState } from 'react';
import SlideIn from '../Utilities/SlideIn';
import SlideOut from '../Utilities/SlideOut';
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
`;

// #endregion
function SplashScreen(props){
    const [isSignedIn, setIsSignedIn] = useState(props.isSignedIn);

    useEffect(() => {
        if(props.isSignedIn){
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    })

    if(isSignedIn){
        return (
            <SlideOut animDelay="2s" animDuration=".75s" animFillMode="forwards" isForText="false" >
                <StyledSplashScreen isSignedIn = {props.isSignedIn}>
                    <SlideOut animDelay="0s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText="true">
                        <AppTitle text="TEXT" slideInOut="out"/>
                    </SlideOut>
                    <SignInScreen isSignedIn = {props.isSignedIn} />
                    <Icon/>
                </StyledSplashScreen>
            </SlideOut>
        );
    } else {
        return (
            <SlideIn animDelay="0s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText="false" >
                <StyledSplashScreen isSignedIn = {props.isSignedIn}>
                    <SlideIn animDelay=".2s" animDuration="2s" animFillMode="forwards" isForText="true">
                        <AppTitle text="TEXT" slideInOut="in"/>
                    </SlideIn>
                    <SignInScreen isSignedIn = {props.isSignedIn} />
                    <Icon/>
                </StyledSplashScreen>
            </SlideIn>
        );
     }
    }

export default SplashScreen;
