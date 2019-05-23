import React from 'react';
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
    box-shadow: 0 0px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;
//#endregion

function BottomNav(props) {
    const { handleListInput, writeConcert, name, rawLists, shouldUpdate } = props;
    return (
        <StyledBottomNav>
            <NavDrawer name={name} />
            <ActionMenu rawLists={rawLists} writeList={handleListInput} writeConcert={writeConcert} didModalClose={shouldUpdate}/>
        </StyledBottomNav>
    )
}

//#region PropTypes
BottomNav.propTypes = {
    handleListInput: PropTypes.func,
    handleConcertInput: PropTypes.func,
    name: PropTypes.string,
    rawLists: PropTypes.array,
    shouldUpdate: PropTypes.bool
}
//#endregion

export default BottomNav;
