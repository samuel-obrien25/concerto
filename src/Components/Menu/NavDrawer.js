import React, { useState } from 'react';
import MenuButton from '../Buttons/MenuButton';
import styled from 'styled-components';
import { ReactComponent as MusicNote } from '../Icons/assets/musicNote.svg';

const StyledNavDrawer = styled.section`
    background-color: #fff;
    position: fixed;
    top:0;
    left:0;
    width: 400px;
    height: 100vh;
    transform: ${props => props.isActive ? 'auto' : 'translateX(-100%)'};
    transition: .3s ease-in-out;
    overflow: hidden;
`;

const StyledNavHeader = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
`;

const StyledNavH2 = styled.h2`
    font-size: 24px;
    color: rgba(0,0,0,.85);
    text-align: left;
`;

const StyledNavMenu = styled.ul`
    padding-left: 0px;
    display: flex;
    width: 90%;
    height: 100%;
    margin-left: 5%;

    & li {
        border-radius: 10px;
        transition: .25s ease-in-out;
        list-style: none;
        padding: 10px;
        width: 100%;
        margin: auto;
        margin-top: 10px;
        display: flex;

        & * {
            padding: 0px;
            margin: auto 0;
            margin-left: 0px;
            height: auto;
        }
        & span{
            margin-left: 10px;
        }

        :hover{
            background-color: #f0f0f0;
            cursor: pointer;
        }
    }

`;

function NavDrawer (props) {

    const [isVisible, setIsVisible] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState(null);

    const handleNavClick = (e) => {
        window.alert(e.target.closest('li').dataset.value);
        setActiveNavItem(e.target.closest('li').dataset.value);
        setIsVisible(!isVisible);
    }

    return (
        <div value = {activeNavItem}>
            <MenuButton isActive={isVisible}
                handleClick={() => setIsVisible(!isVisible)}
            />
            <StyledNavDrawer name = { props.name } isActive={ isVisible } >
                <StyledNavHeader >
                    <StyledNavH2>{ props.name }</StyledNavH2>
                </StyledNavHeader>
                <hr />
                <StyledNavMenu onClick={handleNavClick}>
                    <li data-value="allConcerts"><MusicNote /><span>All Concerts</span></li>
                </StyledNavMenu>
            </StyledNavDrawer>
        </div>
    );
}


export default NavDrawer;
