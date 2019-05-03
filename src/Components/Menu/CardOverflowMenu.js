import React from 'react';
import styled from 'styled-components';

const StyledCardOverflowMenu = styled.div`
    width: 200px;
    height: auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0,0,0,.25);
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(0)'};
    transition: .25s ease-in-out;
    transform-origin: top right;
    position: absolute;
    top: 40px;
    right: 25px;
    overflow: hidden;
    display: flex;
    z-index: 8000;

    & * {
        margin: auto;
    }
`;

const StyledTrigger = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 7900;
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(0)'};
`;

const StyledOverflowList = styled.ul`
    padding-left: 0px;
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    height: 100%;
    padding-bottom: 10px;

    & li {
        border-radius: 5px;
        transition: .25s ease-in-out;
        list-style: none;
        padding: 10px;
        width: 100%;
        margin: auto;
        margin-top: 10px;

        :hover{
            background-color: #f0f0f0;
            cursor: pointer;
        }
    }
`;

function CardOverflowMenu(props) {
    return (
        <React.Fragment>
            <StyledCardOverflowMenu isActive = {props.isActive} >
                <StyledOverflowList > 
                    <li onClick = { props.deleteList }>Delete List</li>
                    <li onClick = { props.favoriteList }>Add to Favorites</li>
                </StyledOverflowList>
            </StyledCardOverflowMenu>
            <StyledTrigger onClick = { props.handleCloseTrigger } isActive = {props.isActive}/>
        </React.Fragment>
    );
}


export default CardOverflowMenu;
