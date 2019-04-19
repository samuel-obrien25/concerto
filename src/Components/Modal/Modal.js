import React, {useState} from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';

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
        opacity: ${props => props.isModalActive ? '1' : '0'};
        transform: ${props => props.isModalActive ? 'auto' : 'translateY(100vh)'};
        z-index: 9999;
    `;
    const StyledModal = styled.div`
        display: block;
        width: 300px;
        height: 400px;
        margin: auto;
        background-color: white;
    `;
    const StyledExitButton = styled.button`
        border: none;
        display: flex;
        background-color: rgba(0,0,0,.5);
    `;

    const StyledAddIcon = styled(AddIcon)`
        margin: auto;
        fill: #fff;
    `

function Modal(props) {

    const [isActive, setIsActive] = useState(props.isModalActive);

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

    function submitList(){
        const inputVal = document.getElementById('modal_input').value;

        if (props.modalType === 'newList') {
            writeNewList(inputVal);
        }
    }

    function closeModal(){
        setIsActive(false);
    }

    console.log(props.isModalActive);
    if(props.modalType === 'newList'){
        return(
            <StyledModalWrapper isActive={isActive} isModalActive ={props.isModalActive}>
                <StyledModal>
                    <StyledExitButton onClick={closeModal}>
                        <StyledAddIcon/>
                    </StyledExitButton>
                    <p>What would you like to name your new list?</p>
                    <input id="modal_input" type="text" name="input" />
                    <button onClick={submitList}>Create List</button>
                </StyledModal>
            </StyledModalWrapper>

        )
    }
    if(props.modalType === 'newConcert'){
        return(
            <StyledModalWrapper isActive={isActive}>
                <StyledModal>
                    <StyledExitButton onClick={closeModal}>
                        <StyledAddIcon />
                    </StyledExitButton>
                    <p>What concert would you like to add?</p>
                    <input id="modal_input" type="text" name="input" />
                    <button onClick={submitList}>Add concert</button>
                </StyledModal>
            </StyledModalWrapper>

        )
    }

    else return null
}


export default Modal;