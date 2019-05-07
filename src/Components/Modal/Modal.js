import React from 'react';
import styled from 'styled-components';
import ListCreator from '../Lists/ListCreator';
import ConcertCreator from '../Lists/ConcertCreator';

    const StyledModalWrapper = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.5);
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        transition: .25s ease-in-out;
        opacity: ${props => props.isModalExpanded ? '1' : '0'};
        transform: ${props => props.isModalExpanded ? 'auto' : 'translateY(100vh)'};
        z-index: 9999;
    `;
    const StyledModal = styled.div`
        display: block;
        width: 400px;
        height: 600px;
        margin: auto;
        background-color: white;
        position: relative;
    `;

function Modal(props) {


    if(props.modalType === 'newList'){
        return(
            <StyledModalWrapper isModalExpanded = {props.isModalExpanded} >
                <StyledModal>
                    {props.children}
                    <ListCreator writeList={props.writeList} isActive={props.isModalExpanded} handleClick = {props.handleClick} closeModal = {props.closeModal}/>
                </StyledModal>
            </StyledModalWrapper>
        )
    }
    if(props.modalType === 'newConcert') {
        return (
            <StyledModalWrapper isModalExpanded = {props.isModalExpanded} >
                <StyledModal>
                    {props.children}
                    <ConcertCreator rawLists = {props.rawLists} writeConcert={props.writeConcert} isActive={props.isModalExpanded} handleClick = {props.handleClick} closeModal = {props.closeModal}/>
                </StyledModal>
            </StyledModalWrapper>

        )
    }

    else return null
}


export default Modal;