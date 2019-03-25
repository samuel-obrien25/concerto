import React from 'react';
import styled, { keyframes } from 'styled-components';


function Slide(props) {

// #region STYLES
    const SlideIn = (props) => keyframes`
        from {
            transform: ${props.animStyle === "fullScreen" ? "translateY(100vh)" : "translateY(50px)"};
        }
        to {
            transform: translateY(0px);
            opacity: 1;
            display: none;
        }
    `;
    const SlideOut = (props) => keyframes`
        from {
            transform: translateY(0px);
        }
        to {
            transform: ${props.animStyle === "fullScreen" ? "translateY(-100vh)" : "translateY(-100px)"};
            opacity: 0;
            display: none;
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
        height: auto;
        width: 100%;
        margin: auto;
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
        height: auto;
        width: auto;
    `;
    // #endregion STYLES

        const { animDelay, animDuration, animFillMode, animStyle, inOut, isForText } = props;

        if(inOut === "in"){
            return (
                <StyledSlideIn isForText={isForText} animDelay={animDelay} animFillMode={animFillMode} animDuration={animDuration} animStyle={animStyle}>
                    {props.children}
                </StyledSlideIn>
            );
        } else {
            return (
                <StyledSlideOut animDelay={animDelay} animFillMode={animFillMode} animDuration={animDuration} isForText={isForText}>
                    {props.children}
                </StyledSlideOut>
            );
        }
    }
export default Slide;
