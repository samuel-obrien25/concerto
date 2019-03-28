import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
import ListCreator from './ListCreator';
import AllLists from './AllLists';
import firebase from 'firebase';
const StyledListOverviewWrapper = styled.section`
    position: relative;
    transition: .3s ease-in-out;
    overflow: hidden;
    margin: auto;
    display: flex;
    flex-direction: column;
    & *{
        margin: auto;
        text-align: left;
    }
`;

const StyledAddIcon = styled(AddIcon)`
    position: relative;
    margin: 40px auto;
    width: 75px;
    height: 75px;
    border: 2px solid rgba(0,0,0,.6);
    border-radius: 10px;
    fill: rgba(0,0,0,.6);
    transition: .15s ease-in-out;
    transform: ${props => props.isVisible ? 'scale(0)' : 'scale(1)'};

    :hover {
        fill: rgba(0,0,0,.85);
        border: 2px solid rgba(0,0,0,.85);
    }
`;

function ListOverview(props) {
    const [clicked, setClicked] = useState(false);
    const [userLists, getUserLists] = useState(null);

    const userData = props.activeUserData;
    const database = firebase.database();

    console.log("userdata: ", userData);
    console.log("database: ", database);
    console.log("user lists: ", userLists);


    //Function for getting all lists from database
    function handleSnapshot(snapshot) {
        const returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);

        });

        return returnArr
    };
    const test = database.ref('users/' + userData.uid + '/lists').on('value', function(snapshot){
            return handleSnapshot(snapshot);
     });

    //function for mapping lists from database
    
    if (!userLists) {
        return (
            <StyledListOverviewWrapper >
                <h2>Welcome to Concerto!</h2>
                <h3>Add your first list:</h3>
                <StyledAddIcon isVisible={clicked} onClick={() => {setClicked(!clicked)}} />
                <ListCreator isVisible={clicked} activeUserData={userData} activeDatabase={database} />
                <AllLists userLists = { userLists }/>
            </StyledListOverviewWrapper>
        )
    } else {
        return (
            <StyledListOverviewWrapper >
                <h2>Welcome to Concerto!</h2>
                <h3>Choose a list below, or add a new one:</h3>
                <AddIcon />
                <ListCreator activeUserData={userData} activeDatabase={database} />
                <AllLists userLists = { userLists }/>
            </StyledListOverviewWrapper>
        )
    }
}


export default ListOverview;
