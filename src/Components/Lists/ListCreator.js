import React, {useState} from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

const StyledForm = styled.form`
    transition: .3s ease-in-out;
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(0)'};
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 25px;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;

    h2{
        margin: auto;
        font-family: 'Roboto';
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    margin: auto;
    flex-direction: row;
`;

const Button = styled.button`
    margin: auto;
    border: 2px solid #077FDB;
    background-color: #077FDB;
    padding: 10px 30px;
    display: inline-block;
    transition: .2s ease-in-out;
    font-size: 16px;
    color: #fff;

    :hover{
        cursor:pointer;
        border: 2px solid #008FFF;
        background-color: #008FFF;
    }
`;

const CancelButton = styled(Button)`
    background-color: #f0f0f0;
    border: 2px solid #f0f0f0;
    color: #000;

    :hover{
        background-color: gray;
        border: 2px solid gray;
        color: #fff;
    }
`

function ListCreator(props) {

    const [reload, setReload] = useState(false);
    
    //function for writing new lists to the database
    function writeUserLists(userId, listName) {

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
        const listName = document.getElementById('listTitle').value;
        let   sanitizedListName;


        if(!listName) {
            window.alert('Please enter a name for your list');
        }

        //Thank you Mozilla <3
        sanitizedListName = listName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
        
        event.preventDefault();
        return writeUserLists(userData.uid, sanitizedListName);
    }

    return (
        <StyledForm isActive = {props.isActive} reload={reload} >
            <h2>Create a new list:</h2>
            <input onSubmit = { handleInput } id="listTitle" type="text" name="listTitle" placeholder="List Title"/>
            <ButtonContainer>
                <CancelButton onClick = {props.handleClick}>Cancel</CancelButton>
                <Button onClick={ handleInput }>Submit</Button>
            </ButtonContainer>
        </StyledForm>
    )
}


export default ListCreator;
