import React, {useState, useEffect} from 'react';
import Slide from '../Utilities/Slide';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NavDrawer from '../Components/Menu/NavDrawer';
import ProfileButton from '../Components/Buttons/ProfileButton';
import ListOverview from '../Components/Lists/ListOverview';
import DashboardWelcomeText from '../Components/Text/DashboardWelcomeText';
import ActionMenu from '../Components/Menu/ActionMenu';
import firebase from 'firebase';

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
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [rawLists, setRawLists] = useState();

// Modal Functions
    function writeUserLists(userId, listName) {

        const database = firebase.database();
        const newListKey = database.ref().child('list').push().key;
        const listData = {
            listName: listName
        }
        const updates = {};

        updates['users/' + userId + '/lists/list' + newListKey] = listData;

        setShouldRefresh(true);
        return database.ref().update(updates);

    };

    function handleListInput() {
        //For reference: userData = firebase.auth().currentUser
        const userData = props.activeUserData;
        const listName = document.getElementById('listTitle').value;
        let sanitizedListName;


        if (!listName) {
            return window.alert('Please enter a name for your list');
        }

        //Thank you Mozilla <3
        sanitizedListName = listName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

        writeUserLists(userData.uid, sanitizedListName);
    }

    function writeUserConcert(userId, concertName) {

        const database = firebase.database();
        const checkedLists = document.querySelectorAll('.listCheckbox:checked');

        let concertData = {}

        checkedLists.forEach((selection) => {
            console.log(selection.value);

            concertData.concertName = concertName;

            let updates = {};

            updates['users/' + userId + '/lists/' + selection.value + '/concertList'] = concertData;
            
            setShouldRefresh(true);
            return database.ref().update(updates);
        })
    };

    function handleConcertInput() {
        //For reference: userData = firebase.auth().currentUser
        const userData = props.activeUserData;
        const concertName = document.getElementById('concertTitle').value;
        let sanitizedConcertName;


        if (!concertName) {
            return window.alert('Please enter a name for your concert');
        }

        //Thank you Mozilla <3
        sanitizedConcertName = concertName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

        writeUserConcert(userData.uid, sanitizedConcertName);
    }


    useEffect(() => {
        setRawLists(() => {
            const activeUserData = props.activeUserData;
            const activeDatabase = firebase.database();
            let returnArr = [],
                //Sort here in the future, if so desired
                userListsRef = activeDatabase.ref('users/' + activeUserData.uid + '/lists');

            userListsRef.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    const item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
            });
            return returnArr;
        });
    }, [props.activeUserData]);

    return (
        <StyledWrapper>
            <ActionMenu rawLists={rawLists} writeList = {handleListInput} writeConcert = {handleConcertInput} shouldRefresh = {shouldRefresh} />
            <Slide inOut="in" animDelay="0s" animDuration=".5s" animFillMode="forwards" animStyle="fullscreen" isForText={false} >
                <StyledDashboard activeDatabase={props.activeDatabase}>
                    <NavDrawer name={props.activeUserData.displayName} />
                    <Slide inOut="in" animDelay=".25s" animDuration="1s" animFillMode="forwards" >
                        <ProfileButton userImage={props.activeUserData.photoURL} />
                    </Slide>
                    <DashboardWelcomeText h2text="Wecome to Concerto!" h3text="Choose a list below:" />
                    <ListOverview rawLists = {rawLists} shouldRefresh = {shouldRefresh} activeUserData={props.activeUserData} activeDatabase={props.activeDatabase} />
                </StyledDashboard>
            </Slide>
        </StyledWrapper>
    );
}
export default Dashboard;
// #region PROPTYPES
Dashboard.propTypes = {
    activeUserData: PropTypes.object
}
// #endregion PROPTYPES
