import React from 'react';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '../Icons/assets/add.svg';
import { ReactComponent as ListIcon } from '../Icons/assets/list.svg';
import { ReactComponent as MicIcon } from '../Icons/assets/microphone.svg';

//#region styles

const IconWrapper = styled.div`
    display: flex;
    margin: auto;
    width: auto;
`;

const AddIconWrap = styled.div`
    position: absolute;
    bottom:0;
    right:0;
    margin: auto;
    margin-right: 0px;
    width: 50px;
    height: 50px;
    padding: 10px;
    display: flex;
    border-radius: 50%;
    transition: .25s ease-in-out;
    background-color: orange;
    box-shadow: 0px 4px 8px rgba(0,0,0,.45);
    transform: ${props => props.isExpanded ? "rotate(45deg)" : "auto"};
    :hover {
        box-shadow: 0px 2px 16px rgba(0,0,0,.65);
    }
`;

const StyledAddIcon = styled(AddIcon)`
    fill: #fff;
    margin: auto;
    width: 100%;
    height: 100%;
    transform: scale(.85);
`;

const IconLabel = styled.span`
    padding: 10px 25px;
    background-color: #fff;
    color: rgba(0,0,0,.65);
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0,0,0,.45);
    display: ${props => props.isExpanded ? 'block' : 'none'};
    margin-right: 100px;
    margin-bottom: 15px;
`;


const ListIconWrap = styled.div`
    position: absolute;
    bottom:0;
    right:0;
    margin: auto;
    margin-right: 5px;
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    transition: .25s ease-in-out;
    background-color: red;
    box-shadow: 0px 4px 8px rgba(0,0,0,.45);
    transform: ${props => props.isExpanded ? "scale(1) translateY(-90px)" : "scale(0)"};
    :hover {
        box-shadow: 0px 2px 16px rgba(0,0,0,.65);
    }
`;

const StyledListIcon = styled(ListIcon)`
    fill: #fff;
    margin: auto;
    width: 100%;
    height: 100%;
    transform: scale(.85);
`;

const MicIconWrap = styled.div`
    position: absolute;
    bottom:0;
    right:0;
    margin: auto;
    margin-right: 5px;
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 50%;
    display: flex;
    transition: .25s ease-in-out;
    background-color: black;
    box-shadow: 0px 4px 8px rgba(0,0,0,.45);
    transform: ${props => props.isExpanded ? "scale(1) translateY(-170px)" : "scale(0)"};
    :hover {
        box-shadow: 0px 2px 16px rgba(0,0,0,.65);
    }
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
            <IconWrapper>
                <IconLabel isExpanded={props.isExpanded}>Close</IconLabel>
                    <AddIconWrap onClick={props.handleClick} isExpanded={props.isExpanded}>
                        <StyledAddIcon />
                    </AddIconWrap>
            </IconWrapper>
        )
    }
    if(props.fabType === 'newConcert'){
        return (
            <IconWrapper>
                <IconLabel isExpanded = {props.isExpanded}>Add Concert</IconLabel>
                    <MicIconWrap onClick={props.handleClick} isExpanded={props.isExpanded}>
                        <StyledMicIcon/>
                    </MicIconWrap>
            </IconWrapper>
        )
    }
    if(props.fabType === 'newList'){
        return (
            <IconWrapper>
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