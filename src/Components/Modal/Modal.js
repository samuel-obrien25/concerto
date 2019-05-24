import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ListCreator from '../Lists/ListCreator';
import ConcertCreator from '../Lists/ConcertCreator';
import PropTypes from 'prop-types';

//#region styles
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
//#endregion

function Modal(props) {
    const [modalType, setModalType] = useState(props.modalType);

    const {closeModal, children, handleClick, isModalExpanded, rawLists, writeConcert, writeList} = props;
    let modal;

    if(modalType === 'newList'){
        modal = <ListCreator writeList={writeList} isActive={isModalExpanded} handleClick = {handleClick} closeModal = {closeModal}/>;
    }

    else if(modalType === 'newConcert'){
        modal = <ConcertCreator rawLists = {rawLists} writeConcert={writeConcert} isActive={isModalExpanded} handleClick = {handleClick} closeModal = {closeModal}/>;
    }

    else {
        modal = null;
    }

    useEffect(() => {
        setModalType(props.modalType)
    },[props.modalType]);

    return (
        <StyledModalWrapper isModalExpanded = {isModalExpanded} >
            <StyledModal>
                {children}
                {modal}
            </StyledModal>
        </StyledModalWrapper>
    )
}
//#region proptypes
Modal.propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.node,
    handleClick: PropTypes.func,
    modalType: PropTypes.string,
    rawLists: PropTypes.array,
    writeConcert: PropTypes.func,
    writeList: PropTypes.func
}
//#endregion

export default Modal;