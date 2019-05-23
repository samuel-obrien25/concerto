import React, {useState} from 'react';
import styled from 'styled-components';
import ThreeDotMenu from '../Buttons/ThreeDotMenu';
import PropTypes from 'prop-types';

//#region Styles
const StyledCard = styled.div`
    background-color: #fff;
    height: ${props=>props.isCardExpanded ? '100vh' : 'auto'};
    width: ${props=>props.isCardExpanded ? '100vw' : 'auto'};
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);
    transition: .3s ease-in-out;
    margin: ${props => props.isCardExpanded ? '0' : '10px'};
    margin-left: ${props=>props.isCardExpanded ? '-50px' : '10px'};
    padding: 10px 0px;
    position: relative;
    transform: ${props=>props.isDeleted ? 'scale(0)' : 'auto'};
    display: flex;

    @media(min-width: 700px) {
        height: 350px;
        flex-direction: column;

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

    @media(min-width: 700px) {
        height: 60%;
        width: 90%;
        border-radius: 6px;
        margin: 2% auto;
        background-color: purple;
        box-sizing: border-box;
    }

`;
// #endregion

function Card(props) {

    const [isCardExpanded, setIsCardExpanded] = useState(false);
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
        <StyledCard id={id} activeList={activeList} isDeleted={isDeleted} onClick = {() => setIsCardExpanded(!isCardExpanded)} isCardExpanded = {isCardExpanded}>
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
