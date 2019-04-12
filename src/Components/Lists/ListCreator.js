import React, {useState} from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

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

    const [reload, setReload] = useState(false);
    
    //function for writing new lists to the database
    function writeUserLists(userId, listName) {

        //For reference: database = firebase.database()
        const database = firebase.database();
    
        const listData = {
            listName: listName
        }

        const newListKey = database.ref().child('list').push().key;

        const updates = {};
              updates['users/' + userId + '/lists/list' + newListKey] = listData;

              setReload(true);
              setReload(false);

        return database.ref().update(updates);

    };


    //Function for handling input
    function handleInput(event) {
        //For reference: userData = firebase.auth().currentUser
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
        <StyledForm isVisible = {props.isVisible} reload={reload}>
            <input onSubmit = { handleInput } id="listTitle" type="text" name="listTitle" placeholder="List Title"/>
            <button onClick={ handleInput }>Add List</button>
        </StyledForm>
    )
}


export default ListCreator;
