import React from 'react';
import styled, { keyframes } from 'styled-components';


function SlideIn(props) {

// #region STYLES
    const SlideIn = (props) => keyframes`
        from {
            transform: ${props.animStyle === "fullScreen" ? "translateY(100vh)" : "translateY(50px)"};
        }
        to {
            transform: translateY(0px);
            opacity: 1;
        }
    `;

    const StyledSlideIn = styled.div`
        animation: ${SlideIn};
        animation-delay: ${props => props.animDelay};
        animation-fill-mode: ${props => props.animFillMode};
        animation-duration: ${props => props.animDuration};
        opacity: 0;
        display: flex;
        position: ${props => props.isForText ? "relative" : "absolute"};
        text-align: ${props => props.isForText ? "center" : "left"};
        top:0;
        left: 0;
        height: 100%;
        width: 100%;
    `;
// #endregion STYLES

        const { animDelay, animDuration, animFillMode, animStyle, isForText } = props;
    return (
        <StyledSlideIn isForText={isForText} animDelay={animDelay} animFillMode={animFillMode} animDuration={animDuration} animStyle={animStyle}>
          {props.children}
        </StyledSlideIn>
    );
}

export default SlideIn;
