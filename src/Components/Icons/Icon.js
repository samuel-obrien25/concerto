import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as Eguitar } from './assets/eguitar.svg';
import { ReactComponent as Harp } from './assets/harp.svg';
import { ReactComponent as Microphone } from './assets/microphone.svg';
import { ReactComponent as Panflute } from './assets/panflute.svg';
import { ReactComponent as Xylophone } from './assets/xylophone.svg';

const iconBurst = keyframes`
  0%{
    opacity: 0;
    transform: scale(0.3);
  }
  40%{
    opacity: 0.9;
    transform: scale(1.1);
  }
  60%{
    opacity: 1;
    transform: scale(0.89);
  }
  80%{
    opacity: 1;
    transform: scale(1);
  }
  100%{
      opacity: 0;
      transform: scale(0);
  }
  `;

  const iconRotate = keyframes`
    from{
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
  `;

const StyledIconContainer = styled.div`
    position: relative;
    display: flex;
    height: auto;
    width: auto;
    margin: auto;
`;

const StyledIconBurst = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-color: rgba(255,255,255,.2);
    display: inline-flex;
    padding: 20px;
    animation: ${iconBurst} 3s linear infinite;
`;

const StyledIcon = styled.div`
    animation: ${iconRotate} 3s linear infinite;
    margin: auto;
    width: 80%;
    height: 80%;
    display: flex;
        && * {
        margin: auto;
    }

`;

function Icon() {
    const iconArray = [<Eguitar />, <Harp />, <Microphone />, <Panflute />, <Xylophone />];
    
    const [activeIcon, setActiveIcon] = useState(iconArray[0]);

    useEffect(() => {
        setTimeout(() => {
            setActiveIcon(iconArray[Math.floor(Math.random() * iconArray.length)]);
        }, 3000);
    });

    return(
        <StyledIconContainer>
            <StyledIconBurst>
                <StyledIcon>
                    {activeIcon}
                </StyledIcon>
            </StyledIconBurst>
        </StyledIconContainer>
    )
}

export default Icon