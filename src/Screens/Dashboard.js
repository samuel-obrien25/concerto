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
    const activeUserData = props.activeUserData;
    const activeDatabase = props.activeDatabase;
    
    return (
        <Slide inOut="in" animDelay="2s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText={ false } >
            <StyledDashboard activeDatabase = { activeDatabase }>
                <NavDrawer name={activeUserData.displayName} />
                <Slide inOut="in" animDelay=".2s" animDuration="1s" animFillMode="forwards" >
                    <ProfileButton userImage={activeUserData.photoURL} />
                </Slide>
                <DashboardWelcomeText h2text="Wecome to Concerto!" h3text="Choose a list below, or add a new one:" />
                <ListOverview activeUserData = { activeUserData } activeDatabase = { activeDatabase }/>
            </StyledDashboard>
        </Slide>

    );
}
export default Dashboard;
