import React from 'react';
import Icon from '../Components/Icons/Icon';
import styled from 'styled-components';
import AppTitle from '../Components/Text/AppTitle';

//#region Styles
const StyledSplashScreen = styled.section`
    position: fixed;
    left: 0;
    width: 100%;
    height: 100vh;
    background: gray;
    -background:linear-gradient(to top left, #FDC830, #F37335);
    display: flex;
    flex-direction: column;
    z-index: 9000;
`;

// #endregion
function SplashScreen(props) {

    const {isLoaded, isSignedIn} = props;
    
        return (
                <StyledSplashScreen>
                    <AppTitle text='CONCERTO' slideInOut={isSignedIn ? 'out' : 'in'} />
                    {props.children}
                <Icon isLoaded = {isLoaded}/>

                </StyledSplashScreen>
        )
    }
export default SplashScreen;
