import React from 'react';
import styled from 'styled-components';
import ThreeDotMenu from '../Buttons/ThreeDotMenu';
import PropTypes from 'prop-types';

//#region Styles
const StyledCard = styled.div`
    background-color: #fff;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);
    transition: .3s ease-in-out;
    margin: 10px;
    padding: 10px 0px;
    position: relative;
    transform: ${props=>props.isDeleted ? 'scale(0)' : 'auto'};
    display: flex;

    @media(min-width: 700px) {
        height: 300px;
        width: 250px;

        :hover {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22);
        }
    }
`;

const StyledListTitleContainer = styled.div`
    position: relative;
    margin: auto;
    width: 75%;
    padding: 5px;
    
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
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 10px;
    background-color: purple;
`;
// #endregion

function Card(props) {

    const { activeList, deleteList, favoriteList, id, isDeleted, listTitle } = props;

    function getNumberOfConcerts() {
        let count;
        // Check if list has concerts, set count accordingly
        if (activeList.concertList) {
            count = Object.keys(activeList.concertList).length;
        } else {
            count = 0;
        }

        if (count === 1) {
            return count + ' concert';
        } else {
            return count + ' concerts'
        }
    }


    return (
        <StyledCard id={id} activeList={activeList} isDeleted={isDeleted}>
            <StyledCardImage />
            <StyledListTitleContainer>
                <h2>{listTitle}</h2>
                <h3>{getNumberOfConcerts()}</h3>
                <ThreeDotMenu activeList={activeList} favoriteList={favoriteList} deleteList={deleteList} />
            </StyledListTitleContainer>
        </StyledCard>
    );
}

// #region PROPTYPES
Card.propTypes = {
    activeList: PropTypes.object,
    deleteList: PropTypes.func,
    favoriteList: PropTypes.func,
    id: PropTypes.string,
    isDeleted: PropTypes.func,
    listTitle: PropTypes.string,
}
// #endregion

export default Card;
