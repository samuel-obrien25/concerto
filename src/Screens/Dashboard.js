import React, { useState, useEffect } from 'react';
import Slide from '../Utilities/Slide';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import styled from 'styled-components';
import NavDrawer from '../Components/Menu/NavDrawer';
import ProfileButton from '../Components/Buttons/ProfileButton';
import ListOverview from '../Components/Lists/ListOverview';

//#region Styles
const StyledDashboard = styled.section`
    position: fixed;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #f2f2f2;
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
    
    //Placeholder for when I implement more than one nav item.
    const [activeNavItem, setActiveNavItem] = useState(null);
    
    //This holds current user's data recieved from App.js.
    const activeUserData = props.activeUserData;
    const activeDatabase = props.activeDatabase;
    
    return (
        <Slide inOut="in" animDelay="0s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText={ false } >
            <StyledDashboard activeDatabase = { props.activeDatabase }>
                <NavDrawer name={activeUserData.displayName} />
                <Slide inOut="in" animDelay=".2s" animDuration="1s" animFillMode="forwards" >
                    <ProfileButton userImage={activeUserData.photoURL} />
                </Slide>
                <ListOverview activeUserData = { activeUserData } activeDatabase = { activeDatabase }/>
            </StyledDashboard>
        </Slide>

    );
}
export default Dashboard;
