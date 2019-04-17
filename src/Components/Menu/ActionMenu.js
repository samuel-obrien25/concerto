import React, {useState} from 'react';
import styled from 'styled-components';
import Fab from '../Buttons/Fab';

const StyledActionMenuWrapper = styled.div`
    position: absolute;
    bottom: 25px;
    right: 25px;
    display: flex;
    flex-direction: column;
    z-index: 9999;
`;

function ActionMenu(props) {

    const [isExpanded, setIsExpanded] = useState(false);

    const handleOpen = () => {
        setIsExpanded(!isExpanded);
    }

    const handleNewConcert = () => {
        window.alert('newConcert')
    }

    const handleNewList = () => {
        window.alert('newList')
    }
        return (
            <StyledActionMenuWrapper>
                <Fab fabType='newConcert' handleClick={handleNewConcert} isExpanded={isExpanded} />
                <Fab fabType='newList' handleClick={handleNewList} isExpanded={isExpanded} />
                <Fab fabType='open' handleClick={handleOpen} isExpanded={isExpanded} />
            </StyledActionMenuWrapper>
        )
    }


export default ActionMenu;
