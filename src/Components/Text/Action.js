import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Expand } from '../Icons/assets/expand.svg';
import { ReactComponent as Favorite } from '../Icons/assets/favorite.svg';


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
        <StyledAction onClick={props.handleActionClick} isExpanded = {props.isExpanded}>
            <StyledText isExpanded = {props.isExpanded}>{props.text}</StyledText>
            {currentIcon()}
        </StyledAction>
    );


}

export default Action;
