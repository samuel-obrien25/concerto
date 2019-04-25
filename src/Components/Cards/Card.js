import React, {useState} from 'react';
import styled from 'styled-components';
import ThreeDotMenu from '../Buttons/ThreeDotMenu';
import Action from '../Text/Action';

//#region Styles
const StyledCard = styled.div`
    background-color: #fff;
    height: ${props=>props.isExpanded ? '600px' : 'auto'};
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
    transition: .3s ease-in-out;
    margin: 10px;
`;
const StyledListTitleContainer = styled.div`
    padding: 15px;
    position: relative;
    
    & h2, h3{
        text-align: left;
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    & h2{
        font-size: 21px;
        color: rgba(0,0,0,.85);
    }

    & h3{
        font-size: 14px;
        color: rgba(0,0,0,.4);
    }
`;

const StyledCardImage = styled.div`
    width: auto;
    height: 150px;
    margin: 10px;
    background-color: purple;
    border-radius: 4px;
`;

const StyledActionContainer = styled.div`
    padding: 15px;
    display: flex;
    position: relative;
`;

// #endregion
function Card(props) {

    const [isExpanded, setIsExpanded] = useState(false);

    function setExpanded(){
        setIsExpanded(!isExpanded)
    }

    return (
        <StyledCard activeList = {props.activeList} isExpanded={isExpanded} shouldRefresh={props.shouldRefresh}>
        <StyledCardImage />
            <StyledListTitleContainer>
                <h2>{props.listTitle}</h2>
                <h3>0 concerts</h3>
                <ThreeDotMenu activeList={props.activeList} favoriteList = {props.favoriteList} deleteList = {props.deleteList}/>
            </StyledListTitleContainer>

            <StyledActionContainer>
                <Action text='expand' isExpanded = {isExpanded} handleActionClick={setExpanded} actionIcon='expand'/>
            </StyledActionContainer>
        </StyledCard>
    );
}

// #region PROPTYPES

// #endregion

export default Card;
