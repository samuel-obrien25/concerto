import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardOverflowMenu from '../Menu/CardOverflowMenu';

//#region Styles
const StyledThreeDotWrapper = styled.div`
    display:inline;
    flex-direction: column;
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 20px;
    margin: -20px;

    :hover{
        cursor: pointer;
    }
    :hover > div{
        background-color: rgba(0,0,0,.85);
    }
`;

const Dot = styled.div`
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: rgba(0,0,0,.6);
    margin: 5px auto;
    transition: .2s ease-in-out;
`;

// #endregion
function ThreeDotMenu(props) {
    const [isActive, setIsActive] = useState();

    const handleClick = function(){
        setIsActive(!isActive);
    }
    return (
        <StyledThreeDotWrapper onClick={handleClick}>
            <Dot/>
            <Dot/>
            <Dot/>
            <CardOverflowMenu isActive = {isActive} activeList = {props.activeList}/>
        </StyledThreeDotWrapper>
    );
}

// #region PROPTYPES

// #endregion

export default ThreeDotMenu;