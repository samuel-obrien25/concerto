import React from 'react';
import firebase from 'firebase';
import Card from '../Cards/Card';
import Loading from '../../Utilities/Loading';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';

//#region styles
const slideUp = keyframes`
    to{
        transform: translateY(0);
    }
`;

const StyledListsContainer = styled.div`
    display: grid;
    grid-template-columns: 80%;
    width: 100%;
    height: 100%;
    -webkit-transition: .2s ease-in-out;
    transition: .2s ease-in-out;
    overflow: auto;
    margin-left: -20px;
    margin-top: 15px;
    padding-top: 100px;
    padding-left: 20px;
    justify-content: space-evenly;
    transform: translateY(250px);
    animation: ${slideUp};
    animation-delay: 2s;
    animation-duration: .35s;
    animation-fill-mode: forwards;


      @media (min-width: 700px) {
        grid-template-columns: 30% 30% 30%;
    }

`;

const StyledLoadingContainer = styled(StyledListsContainer)`
    height: 500px;
    display: flex;
`;
//#endregion

function ListContainer(props) {
    
    const {activeUserData, isLoaded, rawLists, snapshot} = props;
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

    function favoriteList(activeList) {
        const user = activeUserData.uid;

        const listData = {
            listName: activeList.listName
        }
        const newFavKey = firebase.database().ref().child('/users/' + user + '/lists/favorites/').push().key;

        let updates = {};

        updates['users/' + user + '/lists/favorites/list' + newFavKey] = listData;

        return activeDatabase.ref().update(updates);
    }

    const mapCards = function () {
        if (isLoaded) {
            let mappedLists = rawLists.map((list, index) => {
                console.log(list.key);
                return <Card id={list.key} key={list.key.toString()} listTitle={list.listName} activeList={list} favoriteList={() => favoriteList(list)} deleteList={() => deleteList(list)}/>
            });
            return mappedLists;

        } else { return; }
    }

    if (!isLoaded) {
        return (
            <StyledLoadingContainer snapshot = {snapshot} rawLists = {rawLists}>
                <Loading />
            </StyledLoadingContainer>
        )

    } else {
        return (
            <StyledListsContainer>
                {mapCards()}
            </StyledListsContainer>
        )
    }
}

//#region PropTypes
ListContainer.propTypes = {
    activeUserData: PropTypes.object,
    isLoaded: PropTypes.bool,
    rawLists: PropTypes.array,
    snapshot: PropTypes.object
}
//#endregion

export default ListContainer