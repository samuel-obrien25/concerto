import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import Card from '../Cards/Card';
import Loading from '../../Utilities/Loading';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//#region styles
const StyledSection = styled.section`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    display: inline-block;
    overflow-x: hidden;
    overflow-y: scroll;
    margin-bottom: 75px;
    padding-top: 75px;

    @media(min-width: 700px) {
        grid-template-columns: 30vw 30vw 30vw;
    }
    @media(min-width: 1150px) {
        grid-template-columns: 22% 22% 22% 22%;
        max-width: 1100px;
    }

`;

const LoadingWrapper = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;

    & *{
        margin: auto;
    }
`;

//#endregion

function ListContainer(props) {
    const [listsLoaded, setListsLoaded] = useState(false);
    const [activeRawLists, setActiveRawLists] = useState(props.rawLists);

    const { activeUserData } = props;

    //The issue is here. Why so many re-renders?
    let activeDatabase = firebase.database();

    //Card Overflow Functions
    function deleteList(activeList) {
        if (!activeList) { return };
        const result = window.confirm('Are you sure you would like to permanently delete this list?');
        const user = firebase.auth().currentUser.uid;
        const listRecipe = activeDatabase.ref('users/' + user + '/lists/' + activeList.key);

        if (result) {
            listRecipe.remove();
        } else {
            return;
        }
    }

    const mapCards = function () {
        if (listsLoaded) {
            let mappedLists = activeRawLists.map((list) => {
                return <Card id={list.key} key={list.key.toString()} listTitle={list.listName} activeList={list} activeUserData = {activeUserData} deleteList={() => deleteList(list)} />
            });
            return mappedLists;

        } else { return; }
    }


    //const allConcertsCard = <Card id='all-concerts' listTitle = 'All Concerts' type='permanent'/>



    useEffect(() => {
        setActiveRawLists(activeRawLists);

        if (activeRawLists) {
            setListsLoaded(true);
        }
    }, [activeRawLists]);


    if (!listsLoaded) {
        return (
            <LoadingWrapper>
                <Loading />
            </LoadingWrapper>
        )
    }
    if(listsLoaded && activeRawLists.length < 1){
        return(
            <h2>Add your first list:</h2>
        )
    }
    return (
            <StyledSection isLoaded={listsLoaded}>
                {mapCards()}
                {props.children}
            </StyledSection>
    )
}

//#region PropTypes
ListContainer.propTypes = {
    activeList: PropTypes.object,
    activeUserData: PropTypes.object,
    rawLists: PropTypes.array,
}
//#endregion

export default ListContainer