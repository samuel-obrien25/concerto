import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//#region styles
const StyledBottomNav = styled.nav`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75px;
    background-color: #fff;
    z-index: 9999;
`;
//#endregion

function BottomNav(props) {

    return (
        <StyledBottomNav>
            {props.children}
        </StyledBottomNav>
    )
}

//#region PropTypes
BottomNav.propTypes = {
}
//#endregion

export default BottomNav;
