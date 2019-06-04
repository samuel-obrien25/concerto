import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import ThreeDotMenu from '../Buttons/ThreeDotMenu';
import List from '../Lists/List';
import ExitButton from '../Buttons/ExitButton';
import PropTypes from 'prop-types';

//#region Styles

const animateCard = keyframes`
    20%{
        top: 2vh;
        left: 2vw;
    }

    100%{
        height: 84vh;
        width: 96vw;
    }
`;

const StyledCard = styled.div`
    background-color: #fff;
    height: ${props=>props.isCardExpanded ? '84vh' : 'auto'};
    width: ${props=>props.isCardExpanded ? '96vw' : '96%'};
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);
    transition: .3s ease-in-out;
    margin: ${props => props.isCardExpanded ? '0' : '15px auto'}; 
    padding: 10px 0px;
    position: ${props => props.isCardExpanded ? 'fixed' : 'relative'};
    transform: ${props=>props.isDeleted ? 'scale(0)' : 'auto'};
    top: ${props => props.isCardExpanded ? '2vw' : 'auto'};
    left: ${props => props.isCardExpanded ? '2vw' : 'auto'};
    z-index: ${props => props.isCardExpanded ? '1' : 'auto'};
    display: flex;
    grid-column-start: auto;

    @media(min-width: 700px) {
        height: 375px;
        width: 100%;
        flex-direction: column;
        padding: 0px;
        animation: ${props => props.isCardExpanded ? animateCard : 'auto'};
        animation-duration: .25s;
        animation-fill-mode: ${props => props.isCardExpanded ? 'forwards' : 'reverse'};

        :hover {
            box-shadow: 0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22);
        }
    }
`;

const StyledListTitleContainer = styled.div`
    position: relative;
    margin: ${props => props.isCardExpanded ? '10px' : 'auto'};
    box-shadow: ${props => props.isCardExpanded ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : 'auto'};
    width: ${props => props.isCardExpanded ? '60%' : '75%'};
    height: ${props => props.isCardExpanded ? '50px' : 'auto'};
    padding: ${props => props.isCardExpanded ? '10px 30px' : '5px'};
    transform: ${props => props.isCardExpanded ? 'translateX(-50px)' : 'auto'};
    z-index: ${props => props.isCardExpanded ? '901' : 'auto'};
    
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
    @media(min-width: 700px) {
        width: ${props => props.isCardExpanded ? '60%' : '100%'};
        height: ${props => props.isCardExpanded ? '75px' : '125px'};
        padding: ${props => props.isCardExpanded ? '10px 30px' : '15px'};
        box-sizing:border-box;
        position: ${props => props.isCardExpanded ? 'absolute' : 'relative'};
        left: 0;
        right: 0;
        top: 15px;
        margin: auto;
    }
    
`;

const StyledCardImage = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin: 10px;
    background-color: purple;
    opacity: ${props => props.isCardExpanded ? '0' : '1'};
    transform: ${props => props.isCardExpanded ? 'scale(0)' : 'auto'};

    @media(min-width: 700px) {
        height: 60%;
        width: 100%;
        border-radius: 6px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        margin: 0;
    }
`;

const ExitButtonWrapper = styled.div`
    position: fixed;
    z-index: 10;
    right: 3vw;
    top: 2vw;
    display: ${props => props.isCardExpanded ? 'block' : 'none'};
    height: 50px;
    width: 50px;
`

// #endregion

function Card(props) {

    const [isCardExpanded, setIsCardExpanded] = useState(false);
    const { activeList, activeUserData, deleteList, id, isDeleted, listTitle } = props;

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
    if(props.permanent){
        return (
            <>
            <ExitButtonWrapper isCardExpanded={true}>
                <ExitButton handleClick={props.removeCard} />
            </ExitButtonWrapper>
            <StyledCard id={id} activeList={activeList} isCardExpanded={true}>
                <StyledCardImage isCardExpanded={true} />
                <StyledListTitleContainer isCardExpanded={true}>
                    <h2>{props.titleOverride}</h2>
                    <h3>{getNumberOfConcerts()}</h3>
                </StyledListTitleContainer>
                <List listData={activeList} isVisible={true} />
            </StyledCard>
            </>
        )
    }

    function handleCardClick(e) {
        //Prevent bubbling on threedotmenu and its closing trigger
        //Dont judge me
        if (e.target.classList.contains('sc-TOsTZ') || e.target.classList.contains('sc-eqIVtm') || e.target.classList.contains('sc-dVhcbM') || e.target.classList.contains('sc-fBuWsC')){
            return
        } else {
            setIsCardExpanded(true);
        }
    }

    return (
        <>
        <ExitButtonWrapper isCardExpanded={isCardExpanded}>
            <ExitButton handleClick={() => setIsCardExpanded(false)} />
        </ExitButtonWrapper>
        <StyledCard id={id} activeList={activeList} isDeleted={isDeleted} onClick = {handleCardClick} isCardExpanded = {isCardExpanded}>
            <StyledCardImage isCardExpanded={isCardExpanded}/>
            <StyledListTitleContainer isCardExpanded={isCardExpanded}>
                <h2>{listTitle}</h2>
                <h3>{getNumberOfConcerts()}</h3>
                <ThreeDotMenu activeList={activeList} deleteList={deleteList} isCardExpanded = {isCardExpanded}/>
            </StyledListTitleContainer>
            <List activeUserData = {activeUserData} listData = {activeList} isVisible = {isCardExpanded} activeList = {activeList}/>
        </StyledCard>
        </>
    );
}

// #region PROPTYPES
Card.propTypes = {
    activeList: PropTypes.object,
    deleteList: PropTypes.func,
    id: PropTypes.string,
    isDeleted: PropTypes.func,
    listTitle: PropTypes.string,
}
// #endregion

export default Card;
