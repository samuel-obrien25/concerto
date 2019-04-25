import React, { useEffect, useState } from 'react';
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

    //Store props.userLists in a const
    const [rawLists, setRawLists] = useState();
    const [shouldRefresh, setShouldRefresh] = useState(false);

    //The issue is here. Why so many re-renders?
    let activeUserData = props.activeUserData,
        activeDatabase = firebase.database();

    //Card Overflow Functions
    function deleteList(activeList) {
        if(!activeList) { return };
        const result = window.confirm("Are you sure you would like to permanently delete this list?");
        const user = firebase.auth().currentUser.uid;
        const listRecipe = activeDatabase.ref('users/' + user + '/lists/' + activeList.key);

        if (result) {
            listRecipe.remove();
            setShouldRefresh(!shouldRefresh);
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

        setShouldRefresh(true);
        return activeDatabase.ref().update(updates);
    }

    useEffect(() => {
        setRawLists(() => {
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
    }, [shouldRefresh]);

    if(props.isLoaded){
        const mappedLists = rawLists.map((list, index) => {
            return (
                <Card shouldRefresh={shouldRefresh} key={index} listTitle={list.listName} activeList={list} favoriteList = {() => favoriteList(list) } deleteList = {() => deleteList(list) }/>
            )
        });
                return (
                <StyledListsContainer>
                    {mappedLists}
                </StyledListsContainer>
        )
    } else {
        return (
            <StyledLoadingContainer>
                <Loading />
            </StyledLoadingContainer>
        )
    }

}
export default ListContainer