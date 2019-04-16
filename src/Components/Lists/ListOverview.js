import React, { useState } from 'react';
import styled from 'styled-components';
import ListCreator from './ListCreator';
import ListsContainer from './ListsContainer';
import NewListButton from '../Buttons/NewListButton';

//#region styles
const StyledListOverviewWrapper = styled.section`
    position: relative;
    transition: .3s ease-in-out;
    overflow: hidden;
    margin: auto;
    display: flex;
    flex-direction: column;
    & *{
        margin: auto;
        text-align: left;
    }
`;

//#endregion

function ListOverview(props) {

    const [clicked, setClicked] = useState(false);
    const [listsLoaded, setListsLoaded] = useState(false);

    setTimeout(() => {
        setListsLoaded(true);
    }, 4000);

    return (
        <StyledListOverviewWrapper >
            <NewListButton isVisible = {clicked} handleClick={() => { setClicked(!clicked) }} />
            <ListCreator isVisible = {clicked} activeUserData={props.activeUserData} />
                <ListsContainer isLoaded={listsLoaded} activeUserData={props.activeUserData}/>
        </StyledListOverviewWrapper>
    )
}

export default ListOverview;
