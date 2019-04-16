import React from 'react';
import Slide from '../Utilities/Slide';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavDrawer from '../Components/Menu/NavDrawer';
import ProfileButton from '../Components/Buttons/ProfileButton';
import ListOverview from '../Components/Lists/ListOverview';
import DashboardWelcomeText from '../Components/Text/DashboardWelcomeText';

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
    // const [activeNavItem, setActiveNavItem] = useState(null);
    
    //This holds current user's data recieved from App.js.

    return (
        <Slide inOut="in" animDelay="0s" animDuration=".5s" animFillMode="forwards" animStyle="fullscreen" isForText={ false } >
            <StyledDashboard activeDatabase = { props.activeDatabase }>
                <NavDrawer name={props.activeUserData.displayName} />
                <Slide inOut="in" animDelay=".2s" animDuration="1s" animFillMode="forwards" >
                    <ProfileButton userImage={props.activeUserData.photoURL} />
                </Slide>
                <DashboardWelcomeText h2text="Wecome to Concerto!" h3text="Choose a list below, or add a new one:" />
                <ListOverview activeUserData = { props.activeUserData } activeDatabase = { props.activeDatabase }/>
            </StyledDashboard>
        </Slide>

    );
}
export default Dashboard;
