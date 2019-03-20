import React, { useEffect, useState } from 'react';
import SlideIn from '../Utilities/SlideIn';
import SlideOut from '../Utilities/SlideOut';

import styled from 'styled-components';

//#region Styles
const StyledSplashScreen = styled.section`
    position: fixed;
    left: 0;
    width: 100%;
    height: 100vh;
    background:linear-gradient(to top left, #FDC830, #F37335);
`;

// #endregion
function SplashScreen(props){

    setTimeout(() => {
        window.localStorage.setItem('data', true);
    }, 1000);

    if(props.isDataLoaded){
        return (
            <SlideOut animDelay="0s" animDuration=".75s" animFillMode="forwards" isForText="false" >
                <StyledSplashScreen isDataLoaded = {props.isDataLoaded} />
            </SlideOut>
        );
    } else {
        return (
            <SlideIn animDelay="0s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText="false" >
                <StyledSplashScreen isDataLoaded={props.isDataLoaded} />
            </SlideIn>
        );
     }
    }

export default SplashScreen;
