import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

const StyledProfileMenu = styled.div`
    width: 200px;
    height: 150px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0,0,0,.25);
    transform: ${props => props.isActive ? "scale(1)" : "scale(0)"};
    transition: .25s ease-in-out;
    transform-origin: top right;
    position: fixed;
    top: 60px;
    right: 40px;
    overflow: hidden;
    display: flex;
    z-index: 9000;

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
    z-index: 8000;
    transform: ${props => props.isActive ? "scale(1)" : "scale(0)"};
`;

const StyledProfileList = styled.ul`
    padding-left: 0px;
    display: flex;
    width: 90%;
    height: 100%;

    & li {
        border-radius: 10px;
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

function ProfileMenu(props) {

    const signOut = () => {
        firebase.auth().signOut();
        window.reload();
    }

    return (
        <div>
            <StyledProfileMenu isActive = {props.isActive} >
                <StyledProfileList > 
                    <li onClick = { signOut }>Sign Out</li>
                </StyledProfileList>
            </StyledProfileMenu>
            <StyledTrigger onClick = { props.handleCloseTrigger } isActive = {props.isActive}/>
        </div>
    );
}


export default ProfileMenu;
