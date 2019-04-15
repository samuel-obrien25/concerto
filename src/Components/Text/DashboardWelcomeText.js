import React from 'react';
import styled from 'styled-components';

// #region STYLES
const StyledTextWrapper = styled.div`
        margin: auto;
        margin-bottom: 0;
        text-align: center;
`;
const StyledH2 = styled.h2`
        position: relative;
        color: rgba(0,0,0,.6);
        text-align:center;
        width: auto;
        font-size: 6vw;
        display: flex;
        font-family: sans-serif;
        letter-spacing: 0px;
        margin: auto;

        @media (min-width: 700px) {
            font-size: 42px;
        }

    `;

const StyledH3 = styled.h3`
        position: relative;
        color: rgba(0,0,0,.6);
        text-align:center;
        width: auto;
        font-size: 4vw;
        display: flex;
        font-family: sans-serif;
        letter-spacing: 0px;
        margin: auto;

        @media (min-width: 700px) {
            font-size: 32px;
        }

`;
// #endregion STYLES


function DashboardWelcomeText(props) {
        return (
                <StyledTextWrapper>
                        <StyledH2>{props.h2text}</StyledH2>
                        <StyledH3>{props.h3text}</StyledH3>
                </StyledTextWrapper>
        );
    }

export default DashboardWelcomeText;
