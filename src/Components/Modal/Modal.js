import React, {useState} from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
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
    const StyledExitButton = styled.button`
        border: none;
        display: flex;
        background-color: rgba(0,0,0,.3);
        border-radius: 50%;
        position: absolute;
        top: 15px;
        left: 15px;
        height: 30px;
        width: 30px;
        z-index: 9999;
        transition: .15s ease-in-out;

        :hover {
            background-color: rgba(0,0,0,.45);
            cursor: pointer;
        }
    `;

    const StyledAddIcon = styled(AddIcon)`
        margin: auto;
        fill: #fff;
        transform: rotate(45deg);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
    `

function Modal(props) {

    const [isActive, setIsActive] = useState(props.isModalActive);

    if(props.modalType === 'newList'){
        return(
            <StyledModalWrapper isModalActive ={props.isModalActive}>
                <StyledModal>
                    <StyledExitButton onClick={() => setIsActive(!isActive)}>
                        <StyledAddIcon/>
                    </StyledExitButton>
                    <ListCreator isActive={props.isModalActive}/>
                </StyledModal>
            </StyledModalWrapper>

        )
    }
    if(props.modalType === 'newConcert'){
        return(
            <StyledModalWrapper isActive={isActive}>
                <StyledModal>
                    <StyledExitButton onClick={() => setIsActive(!isActive)}>
                        <StyledAddIcon />
                    </StyledExitButton>
                </StyledModal>
            </StyledModalWrapper>

        )
    }

    else return null
}


export default Modal;