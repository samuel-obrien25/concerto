import React, { useState } from 'react';
import ListRow from './ListRow';
import ListData from './ListData';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    const {isVisible} = props;

    function formatDate(concertDate){
        let splitDate = concertDate.split('-');
        let formattedDate = [];

        formattedDate.push(splitDate[1]);
        formattedDate.push(splitDate[2]);
        formattedDate.push(splitDate[0]);

        return formattedDate.join('-');
    }

    function sortConcerts() {}

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
                <ListRow className="concertRow" key={concert.concertKey} index={index} onClick={setActiveRow}>
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
