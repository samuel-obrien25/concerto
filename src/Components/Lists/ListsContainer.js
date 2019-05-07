import React, { useState, useLayoutEffect } from 'react';
import firebase from 'firebase';
import Card from '../Cards/Card';
import Loading from '../../Utilities/Loading';
import styled from 'styled-components';

const StyledListsContainer = styled.div`
    display: grid;
    grid-template-columns: 48% 48%;
    width: 100%;
    height: 100%;
    -webkit-transition: .2s ease-in-out;
    transition: .2s ease-in-out;
    overflow: auto;
    margin-left: -20px;
    margin-top: 10%;
    padding-left: 20px;
    justify-content: space-evenly;

      @media (min-width: 700px) {
        grid-template-columns: 30% 30% 30%;
    }

`;

const StyledLoadingContainer = styled(StyledListsContainer)`
    height: 500px;
    display: flex;
`;
function ListContainer(props) {

    const [rawLists, setRawLists] = useState(props.rawLists);

    //The issue is here. Why so many re-renders?
    let activeUserData = props.activeUserData,
        activeDatabase = firebase.database();

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
        if (props.isLoaded) {

            let mappedLists = rawLists.map((list, index) => {
                console.log(list.key);
                return <Card id={list.key} key={list.key.toString()} listTitle={list.listName} activeList={list} favoriteList={() => favoriteList(list)} deleteList={() => deleteList(list)}/>
            });
            return mappedLists;

        } else { return; }
    }

    if (!props.isLoaded) {
        return (
            <StyledLoadingContainer snapshot = {props.snapshot} rawLists = {props.rawLists}>
                <Loading />
            </StyledLoadingContainer>
        )

    } else {
        return (
            <StyledListsContainer>
                {mapCards()}
            </StyledListsContainer>
        )
    }
}
export default ListContainer