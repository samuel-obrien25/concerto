import React from 'react';
import styled, { keyframes } from 'styled-components';


function Loading(props) {

    // #region STYLES
    const slide = (props) => keyframes`
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-25px);
        }
        100% {
            transform: translateY(0);
        }
    `;

    const StyledLoadingWrapper = styled.div`
        display: flex;
        flex-direction: row;
        width: 50px;
        height: 50px;
        margin: auto;
    `;

    const StyledLoading = styled.div`
        width: 7px;
        height: 7px;
        margin: auto;
        border-radius: 50%;
        background-color: gray;
        animation: ${slide} 1500ms infinite ease-in-out;
        animation-delay: ${props=>props.delay};
    `;


    // #endregion STYLES

        return (
            <StyledLoadingWrapper>
                <StyledLoading delay="0s" />
                <StyledLoading delay=".15s" />
                <StyledLoading delay=".3s" />
            </StyledLoadingWrapper>
        );
}


export default Loading;
