import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as Eguitar } from './assets/eguitar.svg';
import { ReactComponent as Harp } from './assets/harp.svg';
import { ReactComponent as Microphone } from './assets/microphone.svg';
import { ReactComponent as Panflute } from './assets/panflute.svg';
import { ReactComponent as Xylophone } from './assets/xylophone.svg';

// #region styles
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
    text-align: center;
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
    transform-origin: center center;
    display: flex;
        && * {
        margin: auto;
    }

`;
// #endregion styles
function Icon() {
    //Add any new icons to this array so they show up in loading animation
    const iconArray = [<Eguitar />, <Harp />, <Microphone />, <Panflute />, <Xylophone />];
    
    const [activeIcon, setActiveIcon] = useState(iconArray[0]);
    //Function to change the icon every 3 seconds (in conjunction with the "Burst" animation timing)
    useEffect(() => {
        let iconTimer = setTimeout(() => {
            setActiveIcon(iconArray[Math.floor(Math.random() * iconArray.length)]); 
        }, 3000);
        //Cleanup
        return () => {
            clearTimeout(iconTimer);
        }
    }, []);

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