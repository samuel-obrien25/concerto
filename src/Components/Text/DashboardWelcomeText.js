import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';

// #region STYLES
const fadeOut = keyframes`
  to {
    opacity: 0;
    transform: translateY(-75px);
  }
`;
const StyledTextWrapper = styled.div`
        margin: auto;
        text-align: center;
        top: 150px;
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: column;
        animation: ${fadeOut};
        animation-delay: 4s;
        animation-duration: .35s;
        animation-fill-mode: forwards;
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
        const [isVisible, setIsVisible] = useState(true);

        setTimeout(() => {
          setIsVisible(false);
        }, 4500);

        if(isVisible){
          return (
            <StyledTextWrapper>
              <StyledH2>{props.h2text}</StyledH2>
              <StyledH3>{props.h3text}</StyledH3>
            </StyledTextWrapper>
          );
        }
        else return null
    }

export default DashboardWelcomeText;
