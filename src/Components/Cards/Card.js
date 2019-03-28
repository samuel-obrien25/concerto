import React, { useState, useEffect } from 'react';
import Slide from '../../Utilities/Slide';
import PropTypes from 'prop-types';

import styled from 'styled-components';

//#region Styles
const StyledCard = styled.div`
    background-color: #fff;
    height: 350px;
    width: 200px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
`;

// #endregion
function Card(props) {

    // #region PROPTYPES

    // #endregion PROPTYPES

    return (
        <Slide inOut="in" animDelay="0s" animDuration="1s" animFillMode="forwards" isForText={false} >
            <StyledCard cardData = {props.cardData}>
                <h2></h2>
            </StyledCard>
        </Slide>

    );
}
export default Card;
