import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Expand } from '../Icons/assets/expand.svg';
import { ReactComponent as Favorite } from '../Icons/assets/favorite.svg';


// #region STYLES
    const StyledAction = styled.div`
    
    margin: auto;
    display: flex;
    flex-direction: column;

    p{
        color: purple;
        font-family: 'Roboto';
        text-transform: uppercase;
        display: inline-flex;
        padding: 10px;
        margin: auto;

        :hover{
            background-color: #f8f8f8;
            cursor: pointer;
        }

    }
    `;

    const StyledIconWrapper = styled.div`
        margin: auto;
        transition: .2s ease-in-out;
        transform: ${props=>props.isExpanded ? 'rotate(180deg)' : 'auto'};
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

    function currentIcon(){
        let icon;
        if(props.actionIcon === 'expand'){
            icon = 
                <StyledIconWrapper isExpanded = {props.isExpanded}>
                     <StyledExpand  />
                </StyledIconWrapper>
        }

        if(props.actionIcon === 'favorite'){
            icon = <StyledFavorite />
        }

        return icon;
    }
    return (
        <StyledAction onClick={props.handleActionClick}>
            <p>{props.text}</p>
            {currentIcon()}
        </StyledAction>
    );


}

export default Action;
