import React, { useState, useEffect } from 'react';
import Slide from '../Utilities/Slide';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import NavDrawer from '../Components/Menu/NavDrawer';
import ProfileButton from '../Components/Buttons/ProfileButton';

//#region Styles
const StyledDashboard = styled.section`
    position: fixed;
    left: 0;
    width: 100%;
    height: 100vh;
    background:linear-gradient(to top left, #FDC830, #F37335);
    display: flex;
    flex-direction: column;
`;

// #endregion
function Dashboard(props) {

// #region PROPTYPES
        Dashboard.propTypes = {
            activeUserData: PropTypes.object.isRequired
        }
// #endregion PROPTYPES
    
    //This holds current user's data recieved from App.js.
    const [activeNavItem, setActiveNavItem] = useState(null);
    const activeUserData = props.activeUserData;
    
    return (
        <Slide inOut="in" animDelay="0s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText={ false } >
            <StyledDashboard>
                <NavDrawer name={activeUserData.displayName} />
                <Slide inOut="in" animDelay=".2s" animDuration="1s" animFillMode="forwards" >
                    <ProfileButton userImage={activeUserData.photoURL} />
                </Slide>
            </StyledDashboard>
        </Slide>

    );
}
export default Dashboard;
