import React, { useState } from 'react';
import styled from 'styled-components';
import MenuList from '../Lists/MenuList';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';

const StyledProfileMenu = styled.div`
    width: 200px;
    height: 150px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 2px 6px rgba(0,0,0,.25);
    transform: ${props => props.isActive ? "scale(1)" : "scale(0)"};
    transition: .25s ease-in-out;
    transform-origin: top right;
    position: fixed;
    top: 60px;
    right: 40px;
`;

function ProfileMenu(props) {

    const signOut = () => {
        firebase.auth().signOut();
        window.reload();
    }

    return (
        <div>
            <StyledProfileMenu isActive = {props.isActive} >
                <MenuList > 
                    <li onClick = { signOut }>Sign Out</li>
                </MenuList>
            </StyledProfileMenu>
        </div>
    );
}


export default ProfileMenu;
