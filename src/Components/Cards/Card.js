import React from 'react';
import Slide from '../../Utilities/Slide';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//#region Styles
const StyledCard = styled.div`
    background-color: #fff;
    height: 200px;
    min-width: 200px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
    margin: 10px;
    display: flex;
    overflow: hidden;
    position: relative;
`;

const StyledListTitleContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    height: 75px;

    & h2{
        margin: auto 30px;
        text-align: left;
        font-size: 18px;
        font-weight: 200;
    }
`;

// #endregion
function Card(props) {
    return (
        <StyledCard>
            <StyledListTitleContainer>
            <h2>{props.listTitle}</h2>
            <h3>0 concerts</h3>
            </StyledListTitleContainer>
        </StyledCard>
    );
}

// #region PROPTYPES

// #endregion

export default Card;
