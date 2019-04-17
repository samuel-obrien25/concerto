import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Card from '../Cards/Card';
import Loading from '../../Utilities/Loading';
import Slide from '../../Utilities/Slide';

import styled from 'styled-components';

const StyledListsContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 250px;
    width: 100vw;
    margin: auto;
    overflow: scroll;
    transition: .2s ease-in-out;
`;

function AllLists(props) {

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
                    <Card key={index} listTitle={list.listName} />
            )
        });
                return (
            <StyledListsContainer>
                {mappedLists}
            </StyledListsContainer>
        )
    } else {
        return <Loading />
    }

}
export default AllLists