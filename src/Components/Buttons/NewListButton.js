import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';

//#region styles
const StyledAddIcon = styled(AddIcon)`
    position: relative;
    margin: 0 auto;
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
//#endregion

function NewListButton(props) {

    return (
            <StyledAddIcon isVisible={props.isVisible} onClick={props.handleClick} />
    )
}

export default NewListButton;
