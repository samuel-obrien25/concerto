import React, {useState} from 'react';
import Slide from '../Utilities/Slide';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavDrawer from '../Components/Menu/NavDrawer';
import ProfileButton from '../Components/Buttons/ProfileButton';
import ListOverview from '../Components/Lists/ListOverview';
import DashboardWelcomeText from '../Components/Text/DashboardWelcomeText';
import ActionMenu from '../Components/Menu/ActionMenu';
import Modal from '../Components/Modal/Modal';

//#region Styles

const StyledWrapper = styled.section`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
`;
const StyledDashboard = styled.div`
    background: #f2f2f2;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
`;

// #endregion
function Dashboard(props) {
    const [isModalActive, setIsModalActive] = useState(false);

    const modal = {
        newList : {
            dialog : 'What would you like to name your new list?',
            button : 'Create list'
        }
    }

// #region PROPTYPES
        Dashboard.propTypes = {
            activeUserData: PropTypes.object.isRequired
        }
// #endregion PROPTYPES
    
    //Placeholder for when I implement more than one nav item.
    // const [activeNavItem, setActiveNavItem] = useState(null);
    
    //This holds current user's data recieved from App.js.
    const handleNewConcert = () => {
        window.alert('newConcert')
    }

    const handleNewList = () => {
        window.alert('newList')
    }

    return (
        <StyledWrapper>
            <ActionMenu handleNewConcert = {handleNewConcert} handleNewList = {handleNewList}/>

            <Slide inOut="in" animDelay="0s" animDuration=".5s" animFillMode="forwards" animStyle="fullscreen" isForText={false} >
                <StyledDashboard activeDatabase={props.activeDatabase}>
                    <NavDrawer name={props.activeUserData.displayName} />
                    <Slide inOut="in" animDelay=".25s" animDuration="1s" animFillMode="forwards" >
                        <ProfileButton userImage={props.activeUserData.photoURL} />
                    </Slide>
                    <DashboardWelcomeText h2text="Wecome to Concerto!" h3text="Choose a list below:" />
                    <ListOverview activeUserData={props.activeUserData} activeDatabase={props.activeDatabase} />
                </StyledDashboard>
            </Slide>
    {/*<Modal modalType = {false} modalPrompt={false} modalButtonText={false}/> */}
        </StyledWrapper>

    );
}
export default Dashboard;
