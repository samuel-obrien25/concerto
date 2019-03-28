import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';

const StyledForm = styled.form`
    position: relative;
    margin: auto;
    transition: .3s ease-in-out;
    overflow: hidden;
    padding: 50px;
    border-radius: 10px;
    transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0)'};
`;

function ListCreator(props) {

    //function for retreiving lists from the databse
    function getUserLists(){
        //....
    }

    //function for writing new lists to the database
    function writeUserLists(userId, listName) {
        //For reference: database = firebase.database()
        const database = props.activeDatabase;
        let databaseBranchLength = database.ref('users/' + userId + '/list').once('value').then(function(snapshot) {
            return (snapshot.val().lists.length())
        });

        database.ref('users/' + userId + '/list' + databaseBranchLength).set({
            listName: listName,
        }, function (error) {
            if (error) { console.log("Error: ", error) };
        });
    };


    //Function for handling input
    function handleInput(event) {
        //For reference: user data = firebase.auth().currentUser
        const userData = props.activeUserData;
        console.log("userdata: ", userData);
        
        const listName = document.getElementById('listTitle').value;
        let   sanitizedListName;


        event.preventDefault();
        //Thank you Mozilla <3
        sanitizedListName = listName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

        return writeUserLists(userData.uid, sanitizedListName);
    }


    return (
        <StyledForm isVisible = {props.isVisible}>
            <input onSubmit = { handleInput } id="listTitle" type="text" name="listTitle" placeholder="List Title"/>
            <button onClick={ handleInput }>Add List</button>
        </StyledForm>
    )
}


export default ListCreator;
