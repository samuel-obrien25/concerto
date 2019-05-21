import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Expand } from '../Icons/assets/expand.svg';
import { ReactComponent as Favorite } from '../Icons/assets/favorite.svg';
import PropTypes from 'prop-types';

// #region STYLES
    const StyledAction = styled.div`
        margin: auto;
        display: flex;
        flex-direction: column;
    `;
    
    const StyledText = styled.p`
        color: purple;
        font-family: 'Roboto';
        text-transform: uppercase;
        padding: 10px;
        margin: auto;
        transition: .25s ease-in-out;
        transform: ${props => props.isExpanded ? 'translateY(75px)' : 'auto'};

        :hover{
            cursor: pointer;
        }
    `;

    const StyledIconWrapper = styled.div`
        margin: auto;
        transition: .3s ease-in-out;
        transform: ${props=>props.isExpanded ? 'rotate(180deg)' : 'auto'};
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        padding: 5px;

        :hover{
            background-color: #f4f4f4;
            cursor: pointer;
        }
        :active{
            background-color: lightgray;
        }
    `;

    const StyledExpand = styled(Expand)`
        fill: rgba(0,0,0,.85);
        margin: auto;
    `;

    const StyledFavorite = styled(Favorite)`
        transition: .2s ease-in-out;
        fill: rgba(0,0,0,.85);
        margin: auto;
    `;
// #endregion STYLES


function Action(props) {
    const { actionIcon, isExpanded, handleActionClick, text } = props;

    function currentIcon(){
        let icon;
        if(actionIcon === 'expand'){
            icon = 
                <StyledIconWrapper isExpanded = {isExpanded}>
                     <StyledExpand  />
                </StyledIconWrapper>
        }

        if(actionIcon === 'favorite'){
            icon = <StyledFavorite />
        }

        return icon;
    }
    return (
        <StyledAction onClick={handleActionClick} isExpanded = {isExpanded}>
            <StyledText isExpanded = {isExpanded}>{text}</StyledText>
            {currentIcon()}
        </StyledAction>
    );
}

//#region proptypes
Action.propTypes = {
    actionIcon: PropTypes.string,
    handleActionClick: PropTypes.func,
    isExpanded: PropTypes.bool,
    text: PropTypes.string
}
//#endregion
export default Action;
