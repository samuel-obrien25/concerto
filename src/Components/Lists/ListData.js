import React from 'react';
import styled from 'styled-components';

//#region Styles
const RowData = styled.span`
    text-align: left;
    font-weight: ${props => props.header ? '700' : '400'};
    height: 2em;
`;
//#endregion Styles

const ListData = (props) => {

    return (
        <RowData>{props.children}</RowData>
    )

    }
export default ListData
