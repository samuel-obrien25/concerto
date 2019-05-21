import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListsContainer from './ListsContainer';
import PropTypes from 'prop-types';

//#region styles

const StyledSection = styled.section`
    position: relative;
    transition: .3s ease-in-out;
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    padding-bottom: 25px;
`;

//#endregion

function ListOverview(props) {

    const [listsLoaded, setListsLoaded] = useState(false);
    const [activeRawLists, setActiveRawLists] = useState(props.rawLists);

    const { activeList, activeUserData, rawLists } = props;

    setTimeout(() => {
        setListsLoaded(true);
    }, 2000);

    useEffect(() => {
        setActiveRawLists(rawLists);
    }, [])

    return (
        <StyledSection>
            <ListsContainer rawLists={activeRawLists} isLoaded={listsLoaded} activeUserData={activeUserData} activelist ={activeList} />
        </StyledSection>
    )
}
//#region proptypes
ListOverview.propTypes = {
    activeList: PropTypes.array,
    activeUserData: PropTypes.object,
    rawLists: PropTypes.array
}
//#endregion

export default ListOverview;
