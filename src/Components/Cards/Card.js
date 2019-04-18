import React from 'react';
import Slide from '../../Utilities/Slide';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThreeDotMenu from '../Buttons/ThreeDotMenu';

//#region Styles
const StyledCard = styled.div`
    background-color: #fff;
    height: auto;
    min-width: 47%;
    border-radius: 12px;
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
    margin: 10px auto;
    overflow: hidden;
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
    width: 100%;
    height: 200px;
    background-color: purple;
`;

const StyledActionContainer = styled.div`
    padding: 15px;
`;

// #endregion
function Card(props) {

    return (
        <StyledCard activeList = {props.activeList}>
            <StyledListTitleContainer>
                <h2>{props.listTitle}</h2>
                <h3>0 concerts</h3>
                <ThreeDotMenu activeList = {props.activeList}/>
            </StyledListTitleContainer>
            <StyledCardImage/>
            <StyledActionContainer>
            </StyledActionContainer>
        </StyledCard>
    );
}

// #region PROPTYPES

// #endregion

export default Card;
