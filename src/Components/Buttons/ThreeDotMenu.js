import React, {useState} from 'react';
import styled from 'styled-components';
import CardOverflowMenu from '../Menu/CardOverflowMenu';
import PropTypes from 'prop-types';

//#region Styles
const StyledThreeDotWrapper = styled.div`
    position: absolute;
    top: -12px;
    right: 0;
    padding: 20px;
    
    :hover{
        cursor: pointer;
    }
    :hover > .sc-dxgOiQ{
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
    const { activeList, deleteList, favoriteList } = props;

    const handleClick = function(){
        setIsActive(!isActive);
    }
    return (
        <StyledThreeDotWrapper onClick={handleClick}>
            <Dot/>
            <Dot/>
            <Dot/>
            <CardOverflowMenu isActive = {isActive} activeList = {activeList} favoriteList = {favoriteList} deleteList = {deleteList}/>
        </StyledThreeDotWrapper>
    );
}

//#region PropTypes
ThreeDotMenu.propTypes = {
    activeList: PropTypes.object,
    deleteList: PropTypes.func,
    favoriteList: PropTypes.func
}
//#endregion

export default ThreeDotMenu;