import React, {useState} from 'react';
import styled from 'styled-components';
import Fab from '../Buttons/Fab';
import Modal from '../Modal/Modal';

const StyledActionMenuWrapper = styled.div`
    position: absolute;
    bottom: 25px;
    right: 25px;
    display: flex;
    flex-direction: column;
    z-index: 9999;
`;

function ActionMenu(props) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [modalType, setModalType] = useState(null);

    function handleOpen() {
        setIsExpanded(!isExpanded);
    }

    function handleNewConcert() {
        setIsModalActive(!isModalActive);
        setModalType('newConcert');
    }

    function handleNewList() {
        setIsModalActive(!isModalActive);
        setModalType('newList');
    }

        return (
            <StyledActionMenuWrapper>
                <Modal modalType={modalType} isModalActive={isModalActive}/>
                <Fab fabType='newConcert' handleClick={handleNewConcert} isExpanded={isExpanded} />
                <Fab fabType='newList' handleClick={handleNewList} isExpanded={isExpanded} />
                <Fab fabType='open' handleClick={handleOpen} isExpanded={isExpanded} />
            </StyledActionMenuWrapper>
        )
    }


export default ActionMenu;
