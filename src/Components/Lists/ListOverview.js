import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ListCreator from './ListCreator';
import AllLists from './AllLists';
import firebase from 'firebase';
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
    console.log('dashboard.js --> listOverview.js activeUserData', props.activeUserData);
    console.log('dashboard.js --> listOverview.js activeDatabase', props.activeDatabase);

    return (
        <StyledListOverviewWrapper >
            <NewListButton isVisible = {clicked} handleClick={() => { setClicked(!clicked) }} />
            <ListCreator isVisible = {clicked} activeUserData={props.activeUserData}  />
            <AllLists activeUserData={props.activeUserData} activeDatabase={props.activeDatabase}/>
        </StyledListOverviewWrapper>
    )
}

export default ListOverview;
