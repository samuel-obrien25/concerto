import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//#region STYLES
const StyledMenuButtonTop = styled.div`
    width: 100%;
    height: 2px;
    background-color: rgba(0,0,0,.85);
    margin: auto;
    transition: .3s cubic-bezier(0.4,0.0,0.2,1);
    transform: ${props => props.active ? 'rotate(-45deg) scaleX(.6) translate(-14px , -5px)' : 'rotate(180deg)'};
`;
const StyledMenuButtonMid = styled(StyledMenuButtonTop)`
    order: 2;
    transform: ${props => props.active ? 'rotate(0deg)' : 'rotate(360deg)'};
`
const StyledMenuButtonBottom = styled(StyledMenuButtonTop)`
    order: 3;
    transform: ${props => props.active ? 'rotate(45deg) scaleX(.6) translate(-12px, 5px)' : 'rotate(180deg)'};
`
const StyledMenuButtonWrapper = styled.section`
    position: relative;
    z-index: 9100;
    left: 35px;
    width: 30px;
    height: 25px;
    display: flex;
    flex-direction: column;
    transition: .4s ease-in-out;
    margin: auto 0;
    
    & :hover{
        cursor: pointer;
    }
`;
//#endregion

const MenuButton = (props) => {
    const {handleClick, isActive} = props;

    return (
        <StyledMenuButtonWrapper role='button' active={isActive} onClick={handleClick}>

            <StyledMenuButtonTop
                active={isActive}
            />
            <StyledMenuButtonMid
                active={isActive}
            />
            <StyledMenuButtonBottom
                active={isActive}
            />

        </StyledMenuButtonWrapper>
    );
}

//#region PROPTYPES
MenuButton.propTypes = {
    handleClick: PropTypes.func,
    isActive: PropTypes.bool
}
//#endregion

export default MenuButton;