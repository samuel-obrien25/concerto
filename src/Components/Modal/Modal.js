import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

function Modal(props) {

    const StyledModalWrapper = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.5);
        display: flex;
    `;
    const StyledModal = styled.div`
        display: block;
        width: 300px;
        height: 400px;
        margin: auto;
        background-color: white;
    `;

const writeNewList = function(listName) {

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



    const handleClick = function(){
       const inputVal = document.getElementById('modal_input').value();

       if (props.modalType === 'newList'){
            writeNewList(inputVal);
       }
    }

    return (
        <StyledModalWrapper>
            <StyledModal>
                <p>{props.modalPrompt}</p>
                <input id="modal_input" type="text" name="input"/>
                <button onClick={handleClick()}>{props.modalButtonText}</button>
            </StyledModal>
        </StyledModalWrapper>
    );
}


export default Modal;