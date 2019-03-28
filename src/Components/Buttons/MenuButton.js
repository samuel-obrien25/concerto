import React from 'react';
import styled from 'styled-components';

//#region STYLES
const StyledMenuButtonTop = styled.div`
    width: 100%;
    height: 2px;
    background-color: rgba(0,0,0,.85);
    margin: auto;
    transition: .4s ease-in-out;
    transform: ${props => props.active ? 'rotate(-45deg) scaleX(.6) translate(-20px , -5px)' : 'rotate(180deg)'};
`;
const StyledMenuButtonMid = styled(StyledMenuButtonTop)`
    order: 2;
    transform: ${props => props.active ? 'rotate(0deg)' : 'rotate(360deg)'};
`
const StyledMenuButtonBottom = styled(StyledMenuButtonTop)`
    order: 3;
    transform: ${props => props.active ? 'rotate(45deg) scaleX(.6) translate(-20px, 5px)' : 'rotate(180deg)'};
`
const StyledMenuButtonWrapper = styled.section`
    position: fixed;
    z-index: 9100;
    top: 25px;
    left: 25px;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    transition: .4s ease-in-out;
    & :hover{
        cursor: pointer;
    }
`;
//#endregion

const MenuButton = (props) => {
    return (

        <StyledMenuButtonWrapper role="button" active={props.isActive} onClick={props.handleClick}>

            <StyledMenuButtonTop
                active={props.isActive}
            />
            <StyledMenuButtonMid
                active={props.isActive}
            />
            <StyledMenuButtonBottom
                active={props.isActive}
            />

        </StyledMenuButtonWrapper>


    );
}


export default MenuButton;
