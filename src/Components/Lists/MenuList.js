import React from 'react';
import styled from 'styled-components';

const StyledMenuList = styled.ul`

    & li {
        transition: .3s ease-in-out;
        list-style: none;
        margin-left: 0;
        padding: 10px;
        width: 100%;
    }

    & li:hover {
        background-color: #f8f8f8;
        cursor: pointer;
    }
`;

function MenuList(props) {

    return (
        <StyledMenuList>
            {props.children}
        </StyledMenuList>
    );

}
 
export default MenuList;
