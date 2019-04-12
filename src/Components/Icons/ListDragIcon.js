import React from 'react';
import styled from 'styled-components';

// #region styles
const StyledDraggableIconWrapper = styled.div`
    height: 20px;
    width: 15px;
    display: flex;
    transition: .2s ease-in-out;
    position: relative;
    float: left;
    margin-left: -5px !important;
`;

const StyledColumn = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledIconDot = styled.div`
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: gray;
    margin: auto;
    position: relative;
`;

// #endregion styles

function ListDragIcon() {
    return (
        <StyledDraggableIconWrapper>
            <StyledColumn>
                <StyledIconDot />
                <StyledIconDot />
                <StyledIconDot />
            </StyledColumn>
            <StyledColumn>
                <StyledIconDot />
                <StyledIconDot />
                <StyledIconDot />
            </StyledColumn>
        </StyledDraggableIconWrapper>
    )
}

export default ListDragIcon