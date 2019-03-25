import React, { useState } from 'react';
import MenuButton from '../Buttons/MenuButton';
import styled from 'styled-components';

const StyledNavDrawer = styled.section`
    background-color: #f2f2f2;
    position: fixed;
    top:0;
    left:0;
    width: 400px;
    height: 100vh;
    transform: ${props => props.isActive ? 'auto' : 'translateX(-100%)'};
    transition: .3s ease-in-out;
`;

function NavDrawer (props) {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <MenuButton isActive={isVisible}
                handleClick={() => setIsVisible(!isVisible)}
            />
            <StyledNavDrawer isActive={isVisible}>
            </StyledNavDrawer>
        </div>
    );
}


export default NavDrawer;
