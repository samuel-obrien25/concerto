import React from 'react';
import SlideIn from '../../Utilities/SlideIn';
import SlideOut from '../../Utilities/SlideOut';
import styled from 'styled-components';
// #region STYLES

const StyledHeadline = styled.h1`
        position: relative;
        color: rgba(255,255,255,.6);
        text-align:center;
        width: auto;
        font-size: 12vw;
        display: flex;
        font-family: sans-serif;
        letter-spacing: 0px;
        margin: auto;
    `;
// #endregion STYLES


class Headline extends React.Component {
    state = {
        SlideInOut: this.props.slideInOut
    }
    
    render(){
        const { location, text, slideInOut } = this.props;

        const inputString = text;
        const separatedString = inputString.split("");
        const mappedChars = separatedString.map((char, index) => {

            if(this.state.SlideInOut === "in"){
                return <SlideIn key={index} animDuration={index * 150 + 'ms'} animFillMode="forwards" animDelay="300ms" isForText={true}>{char}</SlideIn>;
            } else {
                return <SlideOut key={index} animDuration={index * 300 + 'ms'} animFillMode="forwards" animDelay="900ms" isForText={true}>{char}</SlideOut>;
            }
        })

        return (
            <StyledHeadline style={location} slideInOut={slideInOut}>
                {mappedChars}
            </StyledHeadline>
        );
    }
}

export default Headline;
