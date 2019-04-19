import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
import { ReactComponent as MicIcon } from '../Icons/assets/microphone.svg';

//#region styles

const IconWrapper = styled.div`
    display: flex;
    margin: auto;
    width: 250px;
    height: 100px;
`;

const IconLabel = styled.span`
    padding: 10px 25px;
    background-color: #fff;
    color: rgba(0,0,0,.65);
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0,0,0,.45);
    transition: .25s ease-in-out;
    transform: ${props => props.isExpanded ? 'scale(1)' : 'scale(0)'};
    opacity: ${props => props.isExpanded ? '1' : '0'};
    transform-origin:top right;
    margin: auto;
    margin-right: 0px;
`;

const IconContainer = styled.div`
    position: relative;
    margin: auto;
    margin-right:0;
    margin-left: 20px;
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    transition: .2s ease-in-out;
    box-shadow: 0px 4px 8px rgba(0,0,0,.45);
    transform: ${props => props.isExpanded ? "scale(1)" : "scale(0)"};
    opacity: ${props => props.isExpanded ? '1' : '0'};

    :hover {
        box-shadow: 0px 2px 16px rgba(0,0,0,.65);
        cursor: pointer;
    }
`;

const AddIconWrap = styled(IconContainer)`
    background-color: green;
    transform: ${props => props.isExpanded ? "rotate(-45deg) scale(1.25)" : "scale(1.25)"};
    opacity: 1;
`;

const StyledAddIcon = styled(AddIcon)`
    fill: #fff;
    margin: auto;
    width: 100%;
    height: 100%;
    transform: scale(.85);
`;

const ListIconWrap = styled(IconContainer)`
    background-color: red;
    transition-delay: ${props => props.isExpanded ? '.1s' : '.2s'};
`;

const StyledListIcon = styled(AddIcon)`
    fill: #fff;
    margin: auto;
    width: 100%;
    height: 100%;
    transform: scale(.85);
`;

const MicIconWrap = styled(IconContainer)`
    background-color: orange;
    transition-delay: ${props => props.isExpanded ? '.2s' : '.1s'};
`;

const StyledMicIcon = styled(MicIcon)`
    fill: #fff;
    margin: auto;
    width: 100%;
    height: 100%;
    transform: scale(.85);
    
`;

//#endregion

function Fab(props) {

    if(props.fabType === 'open'){
        return (
            <IconWrapper isExpanded = {props.isExpanded}>
                <IconLabel isExpanded={props.isExpanded}>Close</IconLabel>
                    <AddIconWrap onClick={props.handleClick} isExpanded={props.isExpanded}>
                        <StyledAddIcon />
                    </AddIconWrap>
            </IconWrapper>
        )
    }
    if(props.fabType === 'newConcert'){
        return (
            <IconWrapper isExpanded = {props.isExpanded}>
                <IconLabel isExpanded = {props.isExpanded}>Add Concert</IconLabel>
                    <MicIconWrap onClick={props.handleClick} isExpanded={props.isExpanded}>
                        <StyledMicIcon/>
                    </MicIconWrap>
            </IconWrapper>
        )
    }
    if(props.fabType === 'newList'){
        return (
            <IconWrapper isExpanded = {props.isExpanded}>
                <IconLabel isExpanded = {props.isExpanded}>Add List</IconLabel>
                    <ListIconWrap onClick={props.handleClick} isExpanded={props.isExpanded}>
                        <StyledListIcon/>
                    </ListIconWrap>
            </IconWrapper>
        )
    }
    else{
        return null
    }
}

export default Fab;