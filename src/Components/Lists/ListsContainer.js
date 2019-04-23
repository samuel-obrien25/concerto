import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Card from '../Cards/Card';
import Loading from '../../Utilities/Loading';

import styled from 'styled-components';

const StyledListsContainer = styled.div`
    display: grid;
    grid-template-columns: 48% 48%;
    width: 100%;
    height: 90%;
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

function ListContainer(props) {

    //Store props.userLists in a const
    const [rawLists, setRawLists] = useState();

    //The issue is here. Why so many re-renders?
    let activeUserData = props.activeUserData,
        activeDatabase = firebase.database();

    useEffect(() => {
        setRawLists(() => {
            let returnArr = [],
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
    }, []);

    if(props.isLoaded){
        const mappedLists = rawLists.map((list, index) => {
            return (
                <Card key={index} listTitle={list.listName} activeList={list}/>
            )
        });
                return (
            <StyledListsContainer>
                {mappedLists}
            </StyledListsContainer>
        )
    } else {
        return (
            <StyledListsContainer>
                <Loading />
            </StyledListsContainer>
        )
    }

}
export default ListContainer