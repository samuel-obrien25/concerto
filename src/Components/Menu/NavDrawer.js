import React, { useState } from 'react';
import MenuButton from '../Buttons/MenuButton';
import styled from 'styled-components';
import { ReactComponent as MusicNote } from '../Icons/assets/musicNote.svg';
import PropTypes from 'prop-types';

//#region STYLES
const StyledNavDrawer = styled.section`
    background-color: #fff;
    position: absolute;
    top:0;
    left:0;
    width: 300px;
    height: 100vh;
    transform: ${props => props.isActive ? 'auto' : 'translateX(-100%)'};
    transition: .3s cubic-bezier(0.4,0.0,0.2,1);;
    overflow: hidden;
    z-index: 9000;
    box-shadow: ${props => props.isActive ? '0px 0px 18px rgba(0, 0, 0, .15)' : 'auto'};
`;

const StyledNavHeader = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    margin-top: 100px;
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

const StyledCloseTrigger = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 8999;
    transform: ${props => props.isVisible ? 'auto' : 'translateX(-100%)'};
    background-color: rgba(0,0,0,.2);
`;
//#endregion

function NavDrawer (props) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState(null);
    const { name } = props;

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
            <StyledNavDrawer name = { name } isActive={ isVisible } >
                <StyledNavHeader >
                    <StyledNavH2>{ name }</StyledNavH2>
                </StyledNavHeader>
                <hr />
                <StyledNavMenu onClick={handleNavClick}>
                    <li data-value='allConcerts'><MusicNote /><span>All Concerts</span></li>
                </StyledNavMenu>
            </StyledNavDrawer>
            <StyledCloseTrigger isVisible = { isVisible } onClick={() => setIsVisible(!isVisible)}/>
        </div>
    );
}

NavDrawer.propTypes = {
    name: PropTypes.string
}

export default NavDrawer;
