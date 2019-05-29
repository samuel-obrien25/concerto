import React, {useState, useEffect} from 'react';
import Slide from '../Utilities/Slide';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomNav from '../Components/Menu/BottomNav';
import ProfileButton from '../Components/Buttons/ProfileButton';
import DashboardWelcomeText from '../Components/Text/DashboardWelcomeText';
import firebase from 'firebase';
import ListContainer from '../Components/Lists/ListsContainer';
import Card from '../Components/Cards/Card';

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
    const [isLoaded, setIsLoaded] = useState(false);
    const [favoriteCard, setFavoriteCard] = useState(null);
    const [allConcertsCardData, setAllConcertsCardData] = useState(null);
    const [killSwitch, setKillSwitch] = useState(false);

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
        const bandName = document.getElementById('bandName').value,
              venueName = document.getElementById('venueName').value,
              concertDate = document.getElementById('concertDate').value;

        let sanitizedBandName,
            sanitizedVenueName,
            sanitizedConcertDate;

        if (!bandName) {
            return window.alert('Please enter a name for your concert');
        }

        //Thank you Mozilla <3
        sanitizedBandName = bandName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        sanitizedVenueName = venueName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        sanitizedConcertDate = concertDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


        writeUserConcert(userData.uid, sanitizedVenueName, sanitizedBandName, sanitizedConcertDate);
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
    function writeUserConcert(userId, venueName, bandName, concertDate) {

        const database = firebase.database();
        const checkedLists = document.querySelectorAll('.listCheckbox:checked');
        const concertKey = database.ref().child('concert').push().key;

        let updates = {};

        checkedLists.forEach((selection) => {

            let concertData = {
                venueName: venueName,
                concertKey: concertKey,
                bandName: bandName,
                concertDate: concertDate
            };

            updates['users/' + userId + '/lists/' + selection.value + '/concertList/concert' + concertKey] = concertData;
            updates['users/' + userId + '/allConcerts/concertList/concert' + concertKey] = concertData;

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

    function showAllConcerts() {
        const db = firebase.database();
        const allConcerts = db.ref('users/' + activeUserData.uid + '/allConcerts');

        allConcerts.on('value', function(snapshot) {
            setAllConcertsCardData(snapshot.val());
            });
    }
        let allConcertsCard = allConcertsCardData ? <Card permanent = {true} titleOverride='All Concerts' activeList = {allConcertsCardData} removeCard={() => setAllConcertsCardData(null)}/> : null;

    useEffect(() => {
        setRawLists(updateRawLists());
        setTimeout(() => {
            setIsLoaded(true);
        }, 200);
    }, []);
        
    return (
        <StyledWrapper>
            <Slide inOut='in' animDelay='0s' animDuration='.5s' animFillMode='forwards' animStyle='fullscreen' isForText={false} >
                <StyledDashboard activeDatabase={activeDatabase} shouldUpdate = {shouldUpdate}>
                    <Slide inOut='in' animDelay='.25s' animDuration='1s' animFillMode='forwards' >
                        <ProfileButton userImage={activeUserData.photoURL} />
                    </Slide>
                        <DashboardWelcomeText isLoaded={isLoaded} h2text='Wecome to Concerto!' h3text='Choose a list below:' />
                        <ListContainer rawLists = {rawLists} activeUserData={activeUserData} activeDatabase={activeDatabase}>
                            {favoriteCard}
                            {allConcertsCard}
                        </ListContainer>
                </StyledDashboard>
            </Slide>
            <BottomNav showAllConcerts = {showAllConcerts} name={activeUserData.displayName} rawLists={rawLists} writeList={handleListInput} writeConcert={handleConcertInput} didModalClose={shouldUpdate} />
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
