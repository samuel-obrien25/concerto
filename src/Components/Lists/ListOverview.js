import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
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
    const userData = props.activeUserData;
    const database = firebase.database();

    const [clicked, setClicked] = useState(false);

    return (
        <StyledListOverviewWrapper >
            <NewListButton isVisible = {clicked} handleClick={() => { setClicked(!clicked) }} />
            <ListCreator isVisible = {clicked} activeUserData={userData}  />
            <AllLists activeUserData={userData} activeDatabase={database}/>
        </StyledListOverviewWrapper>
    )
}

export default ListOverview;
