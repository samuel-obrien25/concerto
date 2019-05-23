import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavDrawer from '../Menu/NavDrawer';
import ActionMenu from '../Menu/ActionMenu';
import PropTypes from 'prop-types';

//#region styles
const StyledBottomNav = styled.nav`
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75px;
    background-color: #fff;
    z-index: 9999;
`;
//#endregion

function BottomNav(props) {
    const { rawLists, handleListInput, handleConcertInput, shouldUpdate } = props;
    return (
        <StyledBottomNav>
            <NavDrawer name={props.name} />
            <ActionMenu rawLists={rawLists} writeList={handleListInput} writeConcert={handleConcertInput} didModalClose={shouldUpdate}/>
        </StyledBottomNav>
    )
}

//#region PropTypes
BottomNav.propTypes = {
}
//#endregion

export default BottomNav;
