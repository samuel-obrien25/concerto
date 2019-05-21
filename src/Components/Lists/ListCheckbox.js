import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLabel = styled.label`
    display: block;
    padding: 5px;
    text-align: left;

    input{
        margin-left: 10px;
    }
`;

function ListCheckbox(props) {

    const {rawLists} = props;

    const mappedLists = rawLists.map((list, index) => {

        return (
        <StyledLabel key = {index}>
            {list.listName}
            <input className='listCheckbox' type='checkbox' value={list.key} name={index} />
        </StyledLabel>
        );
    });

    return (
        <React.Fragment>
            {mappedLists}
        </React.Fragment>
    )
}

ListCheckbox.propTypes = {
    lists: PropTypes.array
}

export default ListCheckbox;
