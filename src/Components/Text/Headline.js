import React from 'react';
import SlideIn from '../../Utilities/SlideIn';
import styled from 'styled-components';


function Headline(props) {

    // #region STYLES
    const StyledH1 = styled.h1`
        font-family: sans-serif;
        font-size: 32px;
        margin: auto;
        color: rgba(255,255,255,.85);
    `;
    // #endregion STYLES



    return (
        <SlideIn animDuration="300ms" animFillMode="forwards" animDelay="500ms" isForText={true}>
            <StyledH1>{props.text}</StyledH1>
        </SlideIn>
    );
}

export default Headline;
