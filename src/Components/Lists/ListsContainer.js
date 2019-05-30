import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import Card from '../Cards/Card';
import Loading from '../../Utilities/Loading';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//#region styles
const StyledSection = styled.section`
    position: relative;
    transition: ${props => props.isLoaded ? '.3s ease-in-out;' : '1s ease-in-out;'};
    transition-delay: ${props => props.isLoaded ? '2000ms' : '0ms'};
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 25px 0;
    padding-bottom: 100px;
    transform: ${props=>props.isLoaded ? 'auto' : 'translateY(50px)'};

    @media(min-width: 700px) {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

//#endregion

function ListContainer(props) {
    const [listsLoaded, setListsLoaded] = useState(false);
    const [activeRawLists, setActiveRawLists] = useState(props.rawLists);

    const { activeUserData } = props;

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
            let mappedLists = activeRawLists.map((list) => {
                return <Card id={list.key} key={list.key.toString()} listTitle={list.listName} activeList={list} favoriteList={() => favoriteList(list)} deleteList={() => deleteList(list)}/>
            });
            return mappedLists;

        } else { return; }
    }

    
    //const allConcertsCard = <Card id='all-concerts' listTitle = 'All Concerts' type='permanent'/>

 

    useEffect(() => {
        setActiveRawLists(activeRawLists);

        if(activeRawLists){
            setListsLoaded(true);
        }
    }, [activeRawLists]);


    if (!listsLoaded) {
        return (
            <StyledSection>
                <Loading />
            </StyledSection>
        )
    }
        return (
            <StyledSection isLoaded = {listsLoaded}>
               {mapCards()}
               {props.children}
            </StyledSection>
        )
}

//#region PropTypes
ListContainer.propTypes = {
    activeList: PropTypes.object,
    activeUserData: PropTypes.object,
    rawLists: PropTypes.array,
}
//#endregion

export default ListContainer