import React from 'react';
import Slide from '../../Utilities/Slide';
import styled from 'styled-components';
// #region STYLES

const StyledHeadline = styled.h1`
        position: relative;
        color: rgba(255,255,255,.75);
        text-align:center;
        width: auto;
        font-size: 12vw;
        display: flex;
        font-family: sans-serif;
        letter-spacing: 0px;
        margin: auto;
    `;
// #endregion STYLES


class AppTitle extends React.Component {

    render(){
        const { text, slideInOut } = this.props;

        const inputString = text;
        const separatedString = inputString.split('');
        const mappedChars = separatedString.map((char, index) => {

            if (slideInOut === 'in'){
                return <Slide key={index} animDuration={index * 300 + 'ms'} animFillMode='forwards' animDelay='0' inOut='in' isForText={true}>{char}</Slide>;
            } else {
                return <Slide key={index} animDuration={index * 300 + 'ms'} animFillMode='forwards' animDelay='0s' inOut='out' isForText={true}>{char}</Slide>;
            }
        })

        return (
            <StyledHeadline>
                {mappedChars}
            </StyledHeadline>
        );
    }
}

export default AppTitle;
