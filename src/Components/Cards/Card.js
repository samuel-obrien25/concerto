import React from 'react';
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
    margin: auto;
`;

// #endregion
function Card(props) {
    return (
        <StyledCard>
            <h2>{props.listTitle}</h2>
        </StyledCard>
    );
}

// #region PROPTYPES
Slide.propTypes = {
    animDelay: PropTypes.string,
}
// #endregion

export default Card;
