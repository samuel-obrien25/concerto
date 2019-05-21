import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Fab from '../Buttons/Fab';
import Modal from '../Modal/Modal';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
import PropTypes from 'prop-types';

//#region styles
const StyledActionMenuWrapper = styled.div`
    position: absolute;
    bottom: 25px;
    right: 15px;
    z-index: 9999;
    height: 100px;
    width: ${props => props.isExpanded ? '250px' : '100px'};
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
