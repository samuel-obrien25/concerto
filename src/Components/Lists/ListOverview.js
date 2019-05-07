import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListsContainer from './ListsContainer';

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

    setTimeout(() => {
        setListsLoaded(true);
    }, 2000);

    useEffect(() => {
        setActiveRawLists(props.rawLists);
    }, [])

    return (
        <StyledSection>
            <ListsContainer rawLists={activeRawLists} isLoaded={listsLoaded} activeUserData={props.activeUserData} activelist ={props.activeList} />
        </StyledSection>
    )
}

export default ListOverview;
