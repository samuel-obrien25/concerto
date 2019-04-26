import React from 'react';
import styled from 'styled-components';

const ListCreatorWrapper = styled.section`
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
`

function ListCreator( props ) {

    return (
        <ListCreatorWrapper isActive = {props.isActive} >
            <h2>Create a new list:</h2>
            <input onSubmit = { props.writeList } id='listTitle' type='text' name='listTitle' placeholder='List Title'/>
            <ButtonContainer>
                <CancelButton onClick = {props.closeModal}>Cancel</CancelButton>
                <Button onClick={ props.writeList }>Submit</Button>
            </ButtonContainer>
        </ListCreatorWrapper>
    )
}


export default ListCreator;
