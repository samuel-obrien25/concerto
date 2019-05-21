import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
import { ReactComponent as MicIcon } from '../Icons/assets/microphone.svg';
import PropTypes from 'prop-types';

//#region styles
const IconWrapper = styled.div`
    height: 100px;
    width: 100%;
    position: absolute;
    transition: .25s ease-in-out;
`
const ToggleActionMenuWrapper = styled(IconWrapper)`
    position: relative;
    width: auto;
`;

const IconLabel = styled.span`
    padding: 10px 25px;
    position: absolute;
    right: 100px;
    top: 40px;
    background-color: #fff;
    color: rgba(0,0,0,.65);
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0,0,0,.45);
    opacity: ${props => props.isExpanded ? '1' : '0'};
    scale: ${props => props.isExpanded ? '1' : '0'};
    transform-origin: top right;
`;

const IconContainer = styled.div`
    position: absolute;
    top: 30px;
    right: 20px;
    width: 35px;
    height: 35px;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    transition: .2s ease-in-out;
    box-shadow: 0px 4px 8px rgba(0,0,0,.45);
    opacity: ${props => props.isExpanded ? '1' : '0'};

    :hover {
        box-shadow: 0px 2px 16px rgba(0,0,0,.65);
        cursor: pointer;
    }
`;

const AddIconContainer = styled(IconContainer)`
    background-color: rgb(30, 136, 229);
    opacity: 1;
    transform: ${props => props.isExpanded ? 'scale(1.25)' : 'scale(1.25)'};
`;

const StyledAddIcon = styled(AddIcon)`
    fill: #fff;
    margin: auto;
    width: 100%;
    height: 100%;
    transition: .25s ease-in-out;
    transform: ${props => props.isExpanded ? 'rotate(-45deg) scale(.85)' : 'scale(.85)'};
`;

const AddListWrapper = styled(IconWrapper)`
    top: -100px;
    transform: ${props => props.isExpanded ? 'auto' : 'scale(0)'};
`

const ListIconContainer = styled(IconContainer)`
    background-color: white;
    transition-delay: ${props => props.isExpanded ? '.1s' : '.2s'};
`;

const StyledListIcon = styled(AddIcon)`
    fill: rgb(30, 136, 229);
    margin: auto;
    width: 100%;
    height: 100%;
    transform: scale(.85);
`;

const AddConcertWrapper = styled(IconWrapper)`
    top: -200px;
    transform: ${props => props.isExpanded ? 'auto' : 'scale(0)'};
`

const MicIconContainer = styled(IconContainer)`
    background-color: #fff;
    transition-delay: ${props => props.isExpanded ? '.2s' : '.1s'};
`;

const StyledMicIcon = styled(MicIcon)`
    fill: rgb(30, 136, 229);
    margin: auto;
    width: 100%;
    height: 100%;
    transform: scale(.85);
`;

//#endregion

function Fab(props) {

    const {fabType, isExpanded, handleClick} = props;

    if(fabType === 'open'){
        return (
            <ToggleActionMenuWrapper isExpanded = {isExpanded}>
                <IconLabel isExpanded={isExpanded}>Close</IconLabel>
                    <AddIconContainer onClick={handleClick} isExpanded={props.isExpanded}>
                        <StyledAddIcon isExpanded ={isExpanded}/>
                </AddIconContainer>
            </ToggleActionMenuWrapper>
        )
    }
    if(fabType === 'newConcert'){
        return (
            <AddConcertWrapper isExpanded = {isExpanded}>
                <IconLabel isExpanded = {isExpanded}>Add Concert</IconLabel>
                    <MicIconContainer onClick={handleClick} isExpanded={isExpanded}>
                        <StyledMicIcon/>
                    </MicIconContainer>
            </AddConcertWrapper>
        )
    }
    if(fabType === 'newList'){
        return (
            <AddListWrapper isExpanded={isExpanded}>
                <IconLabel isExpanded = {isExpanded}>Add List</IconLabel>
                    <ListIconContainer onClick={handleClick} isExpanded={isExpanded}>
                        <StyledListIcon/>
                    </ListIconContainer>
            </AddListWrapper>
        )
    }
    else{
        return null
    }
}

export default Fab;

//#region PropTypes
Fab.PropTypes = {
    fabType: PropTypes.string,
    handleClick: PropTypes.func,
    isExpanded: PropTypes.bool
}
//#endregion