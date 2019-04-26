import React, { useState } from 'react';
import styled from 'styled-components';
import ThreeDotMenu from '../Buttons/ThreeDotMenu';
import Action from '../Text/Action';
import PropTypes from 'prop-types';

//#region Styles
const StyledCard = styled.div`
    background-color: #fff;
    height: ${props => props.isExpanded ? '600px' : 'auto'};
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
    transition: .3s ease-in-out;
    margin: 10px;
`;
const StyledListTitleContainer = styled.div`
    padding: 15px;
    position: relative;
    
    & h2, h3{
        text-align: left;
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    & h2{
        font-size: 21px;
        color: rgba(0,0,0,.85);
    }

    & h3{
        font-size: 14px;
        color: rgba(0,0,0,.4);
    }
`;

const StyledCardImage = styled.div`
    width: auto;
    height: 150px;
    margin: 10px;
    background-color: purple;
    border-radius: 4px;
`;

const StyledActionContainer = styled.div`
    padding: 15px;
    display: flex;
    position: relative;
`;
// #endregion

function Card(props) {

    const [isExpanded, setIsExpanded] = useState(false);

    function setExpanded() {
        setIsExpanded(!isExpanded)
    }

    function getNumberOfConcerts() {
        const list = props.activeList;
        let count;

        // Check if list has concerts, set count accordingly
        if (list.concertList) {
            count = Object.keys(list.concertList).length;
        } else {
            count = 0;
        }

        if (count === 1) {
            return count + ' concert';
        } else {
            return count + ' concerts'
        }
    }

    const {activeList, deleteList, favoriteList, listTitle, shouldRefresh } = props;
    return (
        <StyledCard activeList={activeList} isExpanded={isExpanded} shouldRefresh={shouldRefresh}>
            <StyledCardImage />
            <StyledListTitleContainer>
                <h2>{listTitle}</h2>
                <h3>{getNumberOfConcerts()}</h3>
                <ThreeDotMenu activeList={activeList} favoriteList={favoriteList} deleteList={deleteList} />
            </StyledListTitleContainer>

            <StyledActionContainer>
                <Action text='expand' isExpanded={isExpanded} handleActionClick={setExpanded} actionIcon='expand' />
            </StyledActionContainer>
        </StyledCard>
    );
}

// #region PROPTYPES
Card.propTypes = {
    activeList: PropTypes.object,
    deleteList: PropTypes.func,
    favoriteList: PropTypes.func,
    listTitle: PropTypes.string,
    shouldRefresh: PropTypes.bool
}
// #endregion

export default Card;
