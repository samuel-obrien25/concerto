import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';


function Slide(props) {

    const [destroy, setDestroy] = useState(false);

// #region PROPTYPES
    Slide.propTypes = {
        animDelay: PropTypes.string,
        animDuration: PropTypes.string.isRequired,
        animFillMode: PropTypes.string,
        animStyle: PropTypes.string,
        inOut: PropTypes.string.isRequired,
        isForText: PropTypes.bool,
        unmount: PropTypes.bool
    }
// #endregion

// #region STYLES
    const SlideIn = (props) => keyframes`
        from {
            transform: ${props.animStyle === "fullscreen" ? "translateY(100vh)" : "translateY(50px)"};
        }
        to {
            transform: auto;
            opacity: 1;
            display: none;
        }
    `;
    const SlideOut = (props) => keyframes`
        from {
            transform: ${props.animStyle === "fullscreen" ? "translateY(-100vh)" : "translateY(-100px)"};
        }
        to {
            transform: auto;
            opacity: 0;
            display: none;
        }
    `;


    const StyledSlide = styled.div`
        animation: ${props => props.inOut === "in" ? SlideIn : SlideOut};
        animation-delay: ${props => props.animDelay};
        animation-fill-mode: ${props => props.animFillMode};
        animation-duration: ${props => props.animDuration};
        opacity: 0;
        display: flex;
        position: ${props => props.isForText ? "relative" : "absolute"};
        text-align: ${props => props.isForText ? "center" : "left"};
        top:0;
        left: 0;
        height: ${props => props.forFixed ? '100vh' : 'auto'};
        width: 100%;
        margin: auto;
        z-index: 9000;
    `;

    // #endregion STYLES

        const { animDelay, animDuration, animFillMode, animStyle, unmount, inOut, isForText, forFixed } = props;

        function destroyChild() {
            if(unmount) {
                setTimeout(() => {
                    setDestroy(true);
                }, 2000);
            }
        }

        setTimeout(() => {
            destroyChild();
        }, 2000);

        if(!destroy){
            return (
                <StyledSlide inOut = {inOut} isForText={isForText} animDelay={animDelay} animFillMode={animFillMode} animDuration={animDuration} animStyle={animStyle} unmount={unmount} forFixed={forFixed}>
                    {props.children}
                </StyledSlide>
            );
        
        }
        if(destroy) {
            return null;
        }
    }

    
export default Slide;
