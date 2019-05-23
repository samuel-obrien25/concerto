import React, {useState, useEffect} from 'react';
import Slide from '../Utilities/Slide';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomNav from '../Components/Menu/BottomNav';
import ProfileButton from '../Components/Buttons/ProfileButton';
import ListOverview from '../Components/Lists/ListOverview';
import DashboardWelcomeText from '../Components/Text/DashboardWelcomeText';
import ActionMenu from '../Components/Menu/ActionMenu';
import firebase from 'firebase';

//#region Styles
const StyledWrapper = styled.section`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
`;
const StyledDashboard = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: #f2f2f2;
`;

// #endregion
function Dashboard(props) {
    const [rawLists, setRawLists] = useState();
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const { activeUserData, activeDatabase } = props;

// Modal Functions

    // Sanitize Input Functions -- Need to refactor into one, reusable function

    function handleListInput() {
        //For reference: userData = firebase.auth().currentUser
        const userData = activeUserData;
        const listName = document.getElementById('listTitle').value;
        let sanitizedListName;

        if (!listName) {
            return window.alert('Please enter a name for your list');
        }

        //Thank you Mozilla <3
        sanitizedListName = listName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

        writeUserLists(userData.uid, sanitizedListName);
    }

    function handleConcertInput() {
        //For reference: userData = firebase.auth().currentUser
        const userData = activeUserData;
        const concertName = document.getElementById('concertTitle').value;
        let sanitizedConcertName;

        if (!concertName) {
            return window.alert('Please enter a name for your concert');
        }

        //Thank you Mozilla <3
        sanitizedConcertName = concertName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

        writeUserConcert(userData.uid, sanitizedConcertName);
    }

    // Write user lists to database
    function writeUserLists(userId, listName) {
        const database = firebase.database();
        const newListKey = database.ref().child('list').push().key;
        const listData = {
            listName: listName,
            concertList: {

            },
            key: newListKey
        }
        const updates = {};

        updates['users/' + userId + '/lists/list' + newListKey] = listData;

        updateDashboard();

        return database.ref().update(updates);
    };

    // Write user concerts to database
    function writeUserConcert(userId, concertName) {

        const database = firebase.database();
        const checkedLists = document.querySelectorAll('.listCheckbox:checked');
        const concertKey = database.ref().child('concert').push().key;

        let updates = {};

        checkedLists.forEach((selection) => {

            let concertData = {
                concertName: concertName,
                concertKey: concertKey
            };

            updates['users/' + userId + '/lists/' + selection.value + '/concertList/concert' + concertKey] = concertData;
            return database.ref().update(updates);
        });
        updateDashboard();
    };

    /** Function for updating the raw lists from the database.
     *  Gets the raw lists from props
     *  Gets a snapshot of user lists from database
     *  pushes each list into a returned array
     */
    
    function updateRawLists(){
        const activeDatabase = firebase.database();
        const userListsRef = activeDatabase.ref('users/' + activeUserData.uid + '/lists');
        let returnArr = [];

        userListsRef.on('value', function (snapshot) {
            //Clear returnArr every time this function runs. Otherwise returnArr will equal old returnArr + new returnArr
            if(returnArr.length){
                returnArr = [];
            };
            // For each user list, push into returnArr
            snapshot.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });

        });

        userListsRef.on('child_removed', function(data) {
            const processedData = 'list' + data.val().key;
            const targetCard = document.getElementById(processedData);
                
            return targetCard.remove();
        })

        return returnArr;
    }

    function updateDashboard() {
        setRawLists(updateRawLists());
        setShouldUpdate(true);

        setInterval(() => {
            setShouldUpdate(false)
        }, 0);
    }

        useEffect(() => {
            setRawLists(updateRawLists());
        }, [])
        
    return (
        <StyledWrapper>
            <Slide inOut='in' animDelay='0s' animDuration='.5s' animFillMode='forwards' animStyle='fullscreen' isForText={false} >
                <StyledDashboard activeDatabase={activeDatabase} shouldUpdate = {shouldUpdate}>
                    <Slide inOut='in' animDelay='.25s' animDuration='1s' animFillMode='forwards' >
                        <ProfileButton userImage={activeUserData.photoURL} />
                    </Slide>
                        <DashboardWelcomeText h2text='Wecome to Concerto!' h3text='Choose a list below:' />
                    <ListOverview rawLists = {rawLists} activeUserData={activeUserData} activeDatabase={activeDatabase} />
                </StyledDashboard>
            </Slide>
            <BottomNav name = {activeUserData.displayName}>
                <ActionMenu rawLists={rawLists} writeList={handleListInput} writeConcert={handleConcertInput} didModalClose={shouldUpdate} />
            </BottomNav>
        </StyledWrapper>
    );
}
export default Dashboard;
// #region PROPTYPES
Dashboard.propTypes = {
    activeDatabase: PropTypes.object,
    activeUserData: PropTypes.object
}
// #endregion PROPTYPES
