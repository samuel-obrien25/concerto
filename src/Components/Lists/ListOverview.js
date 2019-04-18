import React, { useState } from 'react';
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
`;

//#endregion

function ListOverview(props) {

    const [listsLoaded, setListsLoaded] = useState(false);

    setTimeout(() => {
        setListsLoaded(true);
    }, 4000);

    return (
        <StyledSection>
            <ListsContainer isLoaded={listsLoaded} activeUserData={props.activeUserData} />
        </StyledSection>
    )
}

export default ListOverview;
