import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Fab from '../Buttons/Fab';
import Modal from '../Modal/Modal';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';


const StyledActionMenuWrapper = styled.div`
    position: absolute;
    bottom: 25px;
    right: 25px;
    display: flex;
    flex-direction: column;
    z-index: 9999;
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


function ActionMenu(props) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [modalType, setModalType] = useState(null);

    function handleOpen() {
        setIsExpanded(!isExpanded);
    }

    function handleNewConcert() {
        setIsModalActive(true);
        setModalType('newConcert');
        setIsExpanded(!isExpanded);
    }

    function handleNewList() {
        setIsModalActive(true);
        setModalType('newList');
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        if(props.shouldRefresh){
            setIsModalActive(false);
        }
    }, [props.shouldRefresh]);

        return (
            <StyledActionMenuWrapper>
                <Modal rawLists = {props.rawLists} shouldRefresh={props.shouldRefresh} closeModal={() => setIsModalActive(!isModalActive)} writeList={props.writeList} allLists={props.allLists} writeConcert={props.writeConcert} modalType={modalType} isModalActive={isModalActive} handleClick={() => setIsModalActive(!isModalActive)}>
                    <StyledExitButton onClick={() => setIsModalActive(!isModalActive)}>
                        <StyledAddIcon/>
                    </StyledExitButton>
                </Modal>
                <Fab fabType='newConcert' handleClick={handleNewConcert} isExpanded={isExpanded} />
                <Fab fabType='newList' handleClick={handleNewList} isExpanded={isExpanded} />
                <Fab fabType='open' handleClick={handleOpen} isExpanded={isExpanded} />
            </StyledActionMenuWrapper>
        )
    }


export default ActionMenu;
