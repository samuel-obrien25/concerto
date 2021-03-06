import React from 'react';
import styled from 'styled-components';
import ListCheckbox from './ListCheckbox';
import PropTypes from 'prop-types';

const ConcertCreatorWrapper = styled.section`
    transition: .3s ease-in-out;
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(0)'};
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 25px;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;

    h2{
        margin: auto;
        font-family: 'Roboto';
    }
`;

const StyledInput = styled.input`
    border: none;
    position: relative;
    border-bottom: 1px solid #077FDB;
    padding: 10px;
    margin: 10px 0px;
    
    &:focus{
    border-bottom: 2px solid #077FDB;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    margin: auto;
    flex-direction: row;
`;

const Button = styled.button`
    margin: auto;
    border: 2px solid #077FDB;
    background-color: #077FDB;
    padding: 10px 30px;
    display: inline-block;
    transition: .2s ease-in-out;
    font-size: 16px;
    color: #fff;

    :hover{
        cursor:pointer;
        border: 2px solid #008FFF;
        background-color: #008FFF;
    }
`;

const CancelButton = styled(Button)`
    background-color: #f0f0f0;
    border: 2px solid #f0f0f0;
    color: #000;

    :hover{
        background-color: gray;
        border: 2px solid gray;
        color: #fff;
    }
`;

function ConcertCreator(props) {
    const { closeModal, isActive, rawLists, writeConcert } = props;

    return (
        <ConcertCreatorWrapper isActive={isActive}>
            <h2>Add a new concert:</h2>
            <StyledInput id='bandName' type='text' name='bandName' placeholder='Band Name' />
            <StyledInput id='venueName' type='text' name='venueName' placeholder='Venue Name' />
            <StyledInput id='concertDate' type='date' name='concertDate' placeholder='Date' />
            <h2>Which list would you like to add this concert to?</h2>
            <ListCheckbox rawLists={rawLists} />
            <ButtonContainer>
                <CancelButton onClick={closeModal}>Cancel</CancelButton>
                <Button onClick={writeConcert}>Submit</Button>
            </ButtonContainer>
        </ConcertCreatorWrapper>
    )
}

ConcertCreator.propTypes = {
    closeModal: PropTypes.func,
    isActive: PropTypes.bool,
    rawLists: PropTypes.array,
    writeConcert: PropTypes.func
}

export default ConcertCreator;
