import React from 'react';
import styled, { keyframes } from 'styled-components';


function SlideOut(props) {

    // #region STYLES
    const SlideOut = keyframes`
        from {
            transform: translateY(0px);
        }
        to {
            transform: ${props.animStyle === "fullScreen" ? "translateY(-100vh)" : "translateY(-100px)"};
            opacity: 0;
        }
    `;

    const StyledSlideOut = styled.div`
        animation: ${SlideOut};
        animation-delay: ${props => props.animDelay};
        animation-fill-mode: ${props => props.animFillMode};
        animation-duration: ${props => props.animDuration};
        opacity: 1;
        display: flex;
        position: ${props => props.isForText ? "relative" : "absolute"};
        top:0;
        left: 0;
        height: 100%;
        width: 100%;
    `;
    // #endregion STYLES

    const { animDelay, animDuration, animFillMode, isForText } = props;
    return (
        <StyledSlideOut animDelay={animDelay} animFillMode={animFillMode} animDuration={animDuration} isForText={isForText}>
            {props.children}
        </StyledSlideOut>
    );
}

export default SlideOut;
