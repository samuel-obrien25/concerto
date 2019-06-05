import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
import PropTypes from 'prop-types';

//#region STYLES
const StyledExitButton = styled.button`
    border: none;
    display: flex;
    background-color: rgba(0,0,0,.3);
    border-radius: 50%;
    position: absolute;
    top: 15px;
    left: 15px;
    height: 30px;
    width: 30px;
    z-index: 9999;
    transition: .15s ease-in-out;

    :hover {
        background-color: rgba(0,0,0,.45);
        cursor: pointer;
    }
`;

const StyledAddIcon = styled(AddIcon)`
    margin: auto;
    fill: #fff;
    transform: rotate(45deg);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
`

//#endregion

const ExitButton = (props) => {
    const { handleClick } = props;

    return (
        <StyledExitButton onClick={handleClick} className="exit-button">
            <StyledAddIcon/>
        </StyledExitButton>
    );
}

//#region PropTypes
ExitButton.propTypes = {
    handleClick: PropTypes.func
}
//#endregion

export default ExitButton;
