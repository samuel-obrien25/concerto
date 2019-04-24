import React from 'react';
import styled from 'styled-components';
import ListCreator from '../Lists/ListCreator';

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
        position: relative;
    `;

function Modal(props) {


    if(props.modalType === 'newList'){
        return(
            <StyledModalWrapper isModalActive = {props.isModalActive}>
                <StyledModal>
                    {props.children}
                    <ListCreator isActive={props.isModalActive} handleClick = {props.handleClick}/>
                </StyledModal>
            </StyledModalWrapper>

        )
    }

    else return null
}


export default Modal;