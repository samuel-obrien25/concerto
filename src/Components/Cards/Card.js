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
`;

// #endregion
function Card(props) {


function getLengthOfLists() {

}

    return (
        <Slide inOut="in" animDelay=".s" animDuration="1s" animFillMode="forwards" isForText={false} >
            <StyledCard id={props.index} className={props.className}>
                <h2>{props.listName}</h2>
            </StyledCard>
        </Slide>
    );
}

// #region PROPTYPES
Slide.propTypes = {
    animDelay: PropTypes.string,
}
// #endregion

export default Card;
