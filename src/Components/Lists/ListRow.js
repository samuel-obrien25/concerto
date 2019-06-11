import React, { useState } from 'react';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';

//#region Styles

const ActionSlide = keyframes `
    from{
        opacity: 0;
        transform: scaleY(0);
    }
    to{
        opacity: 1;
        transform: auto;
    }
`
const Row = styled.div`
    display: grid;
    grid-template-columns: 40% 35% 25%;
    width: 100%;
    height: 1.5em;
    padding: 10px;
    position: relative;
    background-color: ${props => props.isActive ? '#f0f0f0' : 'auto'};

    :before{
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        width: calc(100% - 20px);
        background-color: #f0f0f0;
        transform: scaleY(0);
        transform-origin: bottom;
        transition: .2s ease-in-out;
        z-index: -1;
    }

    &:hover{
        &:before{
            transform: ${props => props.header ? 'scaleY(0)' : 'scaleY(1)'};
        }
        cursor: pointer;
    } 
`;

const RowHeader = styled(Row)`
    margin-bottom: 25px;
    :before{
        display: none;
    }
`

const ActionRow = styled(Row)`
    animation: ${ActionSlide};
    animation-duration: .2s;
    animation-fill-mode: forwards;
    transform-origin: top;
    background-color: #077FDB;
    display: flex;
    :before{
        display: none;
    }
`

const ActionButton = styled.button`
    border: none;
    background: #fff;
    margin: auto;
`;
//#endregion Styles

const ListRow = (props) => {
    const [isActive, setIsActive] = useState(false);

    const actionMenu = function() {
        if(isActive){
            return (
                <ActionRow>
                    <ActionButton onClick={props.deleteConcert}>Delete</ActionButton>
                    <ActionButton onClick={props.favoriteConcert}>Favorite</ActionButton>
                </ActionRow>
            )
        } else {
            return null
            }
        }

    if(props.listHeader){
        return (
            <RowHeader onClick = {props.handleClick}>
                <h2 id="artist">Artist</h2>
                <h2 id="venue">Venue</h2>
                <h2 id="date">Date</h2>
            </RowHeader>
        )
    }

    return (
        <>
        <Row id={props.propsID} className="concertRow" onClick = {() => setIsActive(!isActive)} isActive={isActive}>
            {props.children}
        </Row>
        {actionMenu()}
        </>

    )

}
ListRow.propTypes = {
    listHeader: PropTypes.bool
}

export default ListRow
