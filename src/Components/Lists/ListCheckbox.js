import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    display: block;
    padding: 5px;
    text-align: left;

    input{
        margin-left: 10px;
    }
`;

function ListCheckbox(props) {
    const lists = props.rawLists;
    const mappedLists = lists.map((list, index) => {
        return (
        <StyledLabel>
            {list.listName}
            <input type="checkbox" value={list.listName} name={index} />
        </StyledLabel>
        );
    });

    return (
        <div>
            {mappedLists}
        </div>
    )
}


export default ListCheckbox;
