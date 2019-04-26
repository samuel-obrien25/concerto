import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Expand } from '../Icons/assets/expand.svg';
import { ReactComponent as Favorite } from '../Icons/assets/favorite.svg';


// #region STYLES
    const StyledAction = styled.p`
        color: purple;
        font-family: 'Roboto';
        text-transform: uppercase;
        display: inline-flex;
        padding: 10px;
        margin-left: -10px;
        margin-right: auto;
        margin-bottom: 0px;

        :hover{
            background-color: #f8f8f8;
        }
    `;

    const StyledExpand = styled(Expand)`
        transform: ${props=>props.isExpanded ? 'rotate(180deg)' : 'auto'};
        transition: .2s ease-in-out;
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

    function currentIcon(){
        let icon;
        if(props.actionIcon === 'expand'){
            icon = <StyledExpand isExpanded = {props.isExpanded} />
        }

        if(props.actionIcon === 'favorite'){
            icon = <StyledFavorite />
        }

        return icon;
    }
    return (
    <StyledAction onClick={props.handleActionClick}>
    {props.text}
    {currentIcon()}
    </StyledAction>
    );


}

export default Action;
