import React, {useState, useEffect} from 'react';
import Slide from '../Utilities/Slide';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BottomNav from '../Components/Menu/BottomNav';
import ProfileButton from '../Components/Buttons/ProfileButton';
import firebase from 'firebase';
import ListContainer from '../Components/Lists/ListsContainer';
import Card from '../Components/Cards/Card';

/**
 * Things the Dashboard component does:
 * -It takes the activeUserData and activeDataBase prop (maybe it should just get that data itself?);
 * -It defines a function for sanitizing user input on the modal component;
 * -It defines a function for writing user lists to the database;
 * -It defines a function for writing user concerts to the database;
 * -It defines a function for updating the Dashboard;
 * -It defines a function for updating the raw lists for use in child components;
 * -It defines a function for showing all concerts;
 * -It defines a function for showing favorite concers;
 * -It sets a 2 second timeout to let auth and data catch up
 * 
 * -It renders the Dashboard that takes two props -- active user data, and the active database data.
 * --It also renders the <ProfileButton> component and feeds it the URL of the profile image from the activeUserData prop
 * --It also renders the <ListContainer> component and feeds it the raw lists state, and the activeUserData/activeDatabase props
 * --It also renders the "All concerts" card and "Favorite concerts" card.
 * --It also renders the <BottomNav> component and feeds it the ShowAllConcerts func, ShowFavConcerts func, writeLists func, writeConcerts func, activeUserData.displayName, rawLists, and didModalClose state
 */

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
    const [rawLists, setRawLists] = useState(null);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [favoriteCardData, setFavoriteCardData] = useState(null);
    const [allConcertsCardData, setAllConcertsCardData] = useState(null);
    const [activeDatabase, setActiveDatabase] = useState(firebase.database());

    let allConcertsCard = allConcertsCardData ? <Card permanent={true} titleOverride='All Concerts' activeList={allConcertsCardData} removeCard={() => setAllConcertsCardData(null)} /> : null;
    let favConcertsCard = favoriteCardData ? <Card permanent={true} titleOverride='Favorite Concerts' activeList={favoriteCardData} removeCard={() => setFavoriteCardData(null)} /> : null;


    const { activeUserData } = props;

    // Sanitize Input from Modal
    function handleModalInput(modalType) {
        let sanitizedListName,
            sanitizedBandName,
            sanitizedVenueName,
            sanitizedConcertDate;

            if(modalType === 'list'){
                const listName = document.getElementById('listTitle').value;

                if (listName) {
                    sanitizedListName = listName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
                    writeUserLists(activeUserData.uid, sanitizedListName);
                } else {
                    window.alert('Please enter a name for your list');
                }
            }

            if(modalType === 'concert'){
                const bandName = document.getElementById('bandName').value,
                      venueName = document.getElementById('venueName').value,
                      concertDate = document.getElementById('concertDate').value;

                if(bandName){
                    sanitizedBandName = bandName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    sanitizedVenueName = venueName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    sanitizedConcertDate = concertDate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    writeUserConcert(activeUserData.uid, sanitizedVenueName, sanitizedBandName, sanitizedConcertDate);
                } else {
                    window.alert('Please enter a band name');
                }
            }
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

        //Lists will not update on dashboard until page refresh unless timeout is set
        setTimeout(() => {
            updateDashboard();
        }, 200);

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

    // Gets updated lists from database and returns as an array
    function updateRawLists(){
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

        userListsRef.on('child_removed', function() {
            updateDashboard();
        })

        return returnArr;
    }

    //Updates ActiveDatabase and RawLists state, then toggles ShouldUpdate state on and off
    function updateDashboard() {
        setActiveDatabase(firebase.database());
        setRawLists(updateRawLists());
        setShouldUpdate(true);

        setInterval(() => {
            setShouldUpdate(false)
        }, 50);
    }

    //Shows all Concerts card
    function showAllConcerts() {
        const db = firebase.database();
        const allConcerts = db.ref('users/' + activeUserData.uid + '/allConcerts');

        allConcerts.on('value', function(snapshot) {
            setAllConcertsCardData(snapshot.val());
            });
    }
    //Shows Favorite Concerts card
    function showFavConcerts() {
        const db = firebase.database();
        const favConcerts = db.ref('users/' + activeUserData.uid + '/favoriteConcerts');

        favConcerts.on('value', function (snapshot) {
            setFavoriteCardData(snapshot.val());
        });
    }

    //Shows <Loading /> for two seconds while auth and data catch up
    useEffect(() => {
        setTimeout(() => {
            updateDashboard();
        }, 2000);
    }, []);
        
    return (
        <StyledWrapper>
            <Slide inOut='in' animDelay='0s' animDuration='.5s' animFillMode='forwards' animStyle='fullscreen' isForText={false} >
                <StyledDashboard activeDatabase={activeDatabase} shouldUpdate = {shouldUpdate}>
                    <Slide inOut='in' animDelay='.25s' animDuration='1s' animFillMode='forwards' >
                        <ProfileButton userImage={activeUserData.photoURL} />
                    </Slide>
                        <ListContainer rawLists = {rawLists} activeUserData={activeUserData} activeDatabase={activeDatabase}>
                            {favConcertsCard}
                            {allConcertsCard}
                        </ListContainer>
                </StyledDashboard>
            </Slide>
            <BottomNav showAllConcerts={showAllConcerts} showFavConcerts={showFavConcerts} name={activeUserData.displayName} rawLists={rawLists} writeList={() => handleModalInput('list')} writeConcert={() => handleModalInput('concert')} didModalClose={shouldUpdate} />
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
