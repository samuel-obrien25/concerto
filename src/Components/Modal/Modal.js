import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

    const StyledModalWrapper = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.5);
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        transition: .25s ease-in-out;
        opacity: ${props => props.isActive ? '1' : '0'};
        transform: ${props => props.isActive ? 'auto' : 'translateY(100vh)'};
        z-index: 9999;
    `;
    const StyledModal = styled.div`
        display: block;
        width: 300px;
        height: 400px;
        margin: auto;
        background-color: white;
    `;

function Modal(props) {

function writeNewList(listName) {

    //For reference: database = firebase.database()
    const database = firebase.database();

    const listData = {
        listName: listName
    }

    const newListKey = database.ref().child('list').push().key;

    const updates = {};
          updates['users/' + firebase.auth().currentUser.uid + '/lists/list' + newListKey] = listData;

    return database.ref().update(updates);
};

    function handleClick(){
        const inputVal = document.getElementById('modal_input').value;

        if (props.modalType === 'newList') {
            writeNewList(inputVal);
        }
    }

if(props.modalType === 'newList'){
    return(
        <StyledModalWrapper isActive={props.isModalActive}>
            <StyledModal>
                <p>What would you like to name your new list?</p>
                <input id="modal_input" type="text" name="input" />
                <button onClick={handleClick}>Create List</button>
            </StyledModal>
        </StyledModalWrapper>

    )
}
else return null
}


export default Modal;