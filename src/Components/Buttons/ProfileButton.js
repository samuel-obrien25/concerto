import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileMenu from '../Menu/ProfileMenu';

//#region STYLES
const StyledProfileButtonWrapper = styled.div`
    width: 50px;
    height: 50px;
    margin: auto;
    transition: .4s ease-in-out;
    display: flex;
    position: fixed;
    top: 25px;
    right: 25px;
`;

const StyledProfileButton = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-image:url(${props => props.userImage }) ;
    background-size: cover;
    position: absolute;
    left:0;
    top:0;
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
    transition: .25s ease-in-out;

    :hover{
        box-shadow: 0px 2px 6px rgba(0,0,0,.32);
    }
`;


//#endregion

const ProfileButton = (props) => {
    const [isActive, setIsActive] = useState(false);

    const toggleButtonState = () => {
        setIsActive(!isActive);
    };

    return (
        <StyledProfileButtonWrapper>
            <StyledProfileButton userImage = { props.userImage } onClick = { toggleButtonState }/>
            <ProfileMenu isActive = { isActive }/>
        </StyledProfileButtonWrapper>
    );
}


export default ProfileButton;
