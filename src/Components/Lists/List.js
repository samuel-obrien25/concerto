import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled, { keyframes } from 'styled-components';
import ListDragIcon from "../Icons/ListDragIcon";


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const slide = (props) => keyframes`
        0% {
            opacity: 0;
            transform: translateY(50px);
        }
        100% {
            opacity: 1;
            transform: auto;
        }
    `;


const StyledContainer = styled.div`
    background-color:linear-gradient(to top left, #FDC830, #F37335);
    animation: ${slide} 300ms forwards ease-in-out;
`;

const StyledDiv = styled.div`
    background-color: #fff;
    position: relative;
    margin: 10px 2px !important;
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,.2);
    width: 200px;
    height: 50px;
    display: flex;
    padding: 10px;
    :hover{
        box-shadow: 0px 2px 6px 0px rgba(0,0,0,.3);
    }
`;

const StyledListName = styled.h3`
    font-weight: 400;
`;

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.listData
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        }, 
        //Change List Value in Firebase
        () => {

        });
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <StyledContainer>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <h2>LISTS</h2>

                                {this.state.items.map((item, index) => (
                                    <Draggable key={item.key} draggableId={item.key} index={index}>
                                        {(provided) => (
                                            <StyledDiv
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                            <ListDragIcon />
                                                <StyledListName>{item.listName}</StyledListName>
                                            </StyledDiv>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </StyledContainer>
            </DragDropContext>
        );
    }
}

export default List