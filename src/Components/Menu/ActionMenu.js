import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Fab from '../Buttons/Fab';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import ExitButton from '../Buttons/ExitButton';

//#region styles
const StyledActionMenuWrapper = styled.div`
    height: 100px;
    width: 100px;
    position: absolute;
    right: 15px;
    top: -55px;
    width: ${props => props.isExpanded ? '250px' : '100px'};
`;
const Trigger = styled.div`
    height: 100vh;
    width: 100vw;
    transform: ${props => props.isExpanded ? 'auto' : 'scale(0)'};
    opacity: ${props => props.isExpanded ? 'auto' : '0'};
    transition: .15s linear;
    transform-origin: bottom right;
    background-color: rgba(255,255,255,.75);
    position: absolute;
    bottom: -25px;
    right:-15px;
    z-index: 12;
`; 
//#endregion

function ActionMenu(props) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [modalType, setModalType] = useState(null);

    const { allLists, didModalClose, rawLists, writeConcert, writeList } = props;

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
        if (didModalClose) {
            setIsModalActive(false);
            console.log('asdf');
            //const allInputs = document.querySelectorAll['input'];
            
            //Clear all inputs here
        }
    }, [didModalClose])

    return (
        <StyledActionMenuWrapper isExpanded={isExpanded}>
            <Modal rawLists = {rawLists} closeModal={() => setIsModalActive(!isModalActive)} writeList={writeList} allLists={allLists} writeConcert={writeConcert} modalType={modalType} didModalClose = {didModalClose} isModalExpanded={isModalActive} handleClick={() => setIsModalActive(!isModalActive)}>
                <ExitButton handleClick={() => setIsModalActive(!isModalActive)}/>
            </Modal>
            <Fab fabType='newConcert' handleClick={handleNewConcert} isExpanded={isExpanded} />
            <Fab fabType='newList' handleClick={handleNewList} isExpanded={isExpanded} />
            <Fab fabType='open' handleClick={handleOpen} isExpanded={isExpanded} />
            <Trigger isExpanded = {isExpanded} onClick={handleOpen}/>
        </StyledActionMenuWrapper>
    )
    }

    //#region PropTypes
    ActionMenu.propTypes = {
        allLists: PropTypes.array,
        didModalClose: PropTypes.bool,
        rawLists: PropTypes.array,
        writeConcert: PropTypes.func,
        writeList: PropTypes.func
    }
    //#endregion

export default ActionMenu;
