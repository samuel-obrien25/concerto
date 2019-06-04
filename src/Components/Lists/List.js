import React, { useState } from 'react';
import ListRow from './ListRow';
import ListData from './ListData';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import firebase from 'firebase';

//#region Styles
const ListWrapper = styled.section`
    position: absolute;
    top: 100px;
    transition: ${props => props.isVisible ? '.2s ease-in-out' : '.0s ease-in-out'};
    transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0)'};
    opacity: ${props => props.isVisible ? '1' : '0'};
    padding-left: 0px;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    z-index: 900;
`;
//#endregion Styles

const List = (props) => {

    //Storing props.listData in its own variable seems to prevent undefined errors
    const concerts = props.listData;
    const {activeUserData, isVisible} = props;

    function formatDate(concertDate){
        let splitDate = concertDate.split('-');
        let formattedDate = [];

        formattedDate.push(splitDate[1]);
        formattedDate.push(splitDate[2]);
        formattedDate.push(splitDate[0]);

        return formattedDate.join('-');
    }

    function deleteConcert(concert) {
        const activeDatabase = firebase.database();
        const activeList = props.activeList;
        const concertKey = concert.concertKey;
        const concertRef = activeDatabase.ref('users/' + activeUserData.uid + '/lists/' + activeList.key + '/concertList/concert' + concertKey);
        const allConcertRef = activeDatabase.ref('users/' + activeUserData.uid + '/allConcerts/concertList/concert' + concertKey);
        const favConcertRef = activeDatabase.ref('users/' + activeUserData.uid + '/favoriteConcerts/concertList/concert' + concertKey);
        const targetRow = document.getElementById(concert.concertKey);
        const result = window.confirm('Are you sure you would like to permanently delete this list?');

        if(result){
            concertRef.remove();
            allConcertRef.remove();
            favConcertRef.remove();
            targetRow.nextElementSibling.remove();
            return targetRow.remove();
        }
    }

    function favoriteConcert(concert) {
        const activeDatabase = firebase.database();
        const concertKey = concert.concertKey;


        let concertData = {
            venueName: concert.venueName,
            concertKey: concert.concertKey,
            bandName: concert.bandName,
            concertDate: concert.concertDate
        };
        let updates = {};

        updates['users/' + activeUserData.uid + '/favoriteConcerts/concertList/concert' + concertKey] = concertData;

        return activeDatabase.ref().update(updates);
    }

    function setActiveRow(e) {

        const rows = Array.from(e.target.parentElement.parentElement.children);
            if(e.target.parentElement.classList.contains('concertRow')){
                rows.forEach(function (row) {
                    row.style.backgroundColor = '#fff';
                })
                e.target.parentElement.style.backgroundColor = '#f0f0f0';
            }
    }

    if (!concerts.concertList) {
        return null;
    }

    return (
        <ListWrapper isVisible = {isVisible}>
            <ListRow listHeader/>
            {Object.values(concerts.concertList).map((concert, index) => (
                <ListRow propsID={concert.concertKey} key={concert.concertKey} index={index} onClick={setActiveRow} deleteConcert={() => deleteConcert(concert)} favoriteConcert={() => favoriteConcert(concert)}>
                    <ListData>{concert.bandName}</ListData>
                    <ListData>{concert.venueName}</ListData>
                    <ListData>{formatDate(concert.concertDate)}</ListData>
                </ListRow>
                )
            )}
        </ListWrapper>
    )

    }
List.propTypes = {
    isVisible: PropTypes.bool
}

export default List
