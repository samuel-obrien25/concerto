import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import Card from '../Cards/Card';
import Loading from '../../Utilities/Loading';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';

//#region styles
const slideUp = keyframes`
    to{
        transform: translateY(0);
    }
`;

const StyledSection = styled.section`
    position: relative;
    transition: .3s ease-in-out;
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    overflow: hidden;
    padding-bottom: 25px;
`;
//#endregion

function ListContainer(props) {
    const [listsLoaded, setListsLoaded] = useState(false);
    const [activeRawLists, setActiveRawLists] = useState(props.rawLists);

    const { activeList, activeUserData, snapshot } = props;

    //The issue is here. Why so many re-renders?
    let activeDatabase = firebase.database();

    //Card Overflow Functions
    function deleteList(activeList) {
        if (!activeList) { return };
        const result = window.confirm('Are you sure you would like to permanently delete this list?');
        const user = firebase.auth().currentUser.uid;
        const listRecipe = activeDatabase.ref('users/' + user + '/lists/' + activeList.key);

        if (result) {
            listRecipe.remove();
        } else {
            return;
        }
    }

    function favoriteList(activeList) {
        const user = activeUserData.uid;
        const listData = {
            listName: activeList.listName
        }
        const newFavKey = firebase.database().ref().child('/users/' + user + '/lists/favorites/').push().key;
        let updates = {};

        updates['users/' + user + '/lists/favorites/list' + newFavKey] = listData;

        return activeDatabase.ref().update(updates);
    }

    const mapCards = function () {
        if (listsLoaded) {
            let mappedLists = activeRawLists.map((list, index) => {
                console.log(list.key);
                return <Card id={list.key} key={list.key.toString()} listTitle={list.listName} activeList={list} favoriteList={() => favoriteList(list)} deleteList={() => deleteList(list)}/>
            });
            console.log(mappedLists);
            return mappedLists;

        } else { return; }
    }

    
    const allConcertsCard = <Card id='all-concerts' listTitle = 'All Concerts' type='permanent'/>

    setTimeout(() => {
        setListsLoaded(true);
    }, 2000);

    useEffect(() => {
        setActiveRawLists(activeRawLists);
    }, [])


    if (!listsLoaded) {
        return (
            <StyledSection snapshot = {snapshot} rawLists = {activeRawLists}>
                <Loading />
            </StyledSection>
        )

    } else {
        return (
            <StyledSection>
               {mapCards()}
            </StyledSection>
        )
    }
}

//#region PropTypes
ListContainer.propTypes = {
    activeList: PropTypes.object,
    activeUserData: PropTypes.object,
    rawLists: PropTypes.array,
    snapshot: PropTypes.object
}
//#endregion

export default ListContainer