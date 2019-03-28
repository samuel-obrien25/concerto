import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
import ListCreator from './ListCreator';
import AllLists from './AllLists';

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

const StyledAddIcon = styled(AddIcon)`
    position: relative;
    margin: 40px auto;
    width: 75px;
    height: 75px;
    border: 2px solid rgba(0,0,0,.6);
    border-radius: 10px;
    fill: rgba(0,0,0,.6);
    transition: .15s ease-in-out;
    transform: ${props => props.isVisible ? 'scale(0)' : 'scale(1)'};

    :hover {
        fill: rgba(0,0,0,.85);
        border: 2px solid rgba(0,0,0,.85);
    }
`;

function ListOverview(props) {
    const [clicked, setClicked] = useState(false);

    const userData = props.activeUserData;
    const database = props.activeDatabase;

    console.log("userdata: ", userData);
    console.log("database: ", database);

    if (!props.listHistory) {
        return (
            <StyledListOverviewWrapper >
                <h2>Welcome to Concerto!</h2>
                <h3>Add your first list:</h3>
                <StyledAddIcon isVisible={clicked} onClick={() => {setClicked(!clicked)}} />
                <ListCreator isVisible={clicked} activeUserData={userData} activeDatabase={database} />
                <AllLists />
            </StyledListOverviewWrapper>
        )
    } else {
        return (
            <StyledListOverviewWrapper >
                <h2>Welcome to Concerto!</h2>
                <h3>Choose a list below, or add a new one:</h3>
                <AddIcon />
                <ListCreator activeUserData={userData} activeDatabase={database} />
                <AllLists />
            </StyledListOverviewWrapper>
        )
    }
}


export default ListOverview;
