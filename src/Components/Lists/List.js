import React, { Component } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.ul`
    position: absolute;
    transition: .25s ease-in-out;
    transform: ${props=>props.isVisible ? 'scale(1)' : 'scale(0)'};
    padding-left: 0px;
    width: 100%;
    box-sizing: border-box;

    li{
        padding: 10px 20px;
        list-style: none;
        transition: .1s ease-in-out;
        width: 100%;
        box-sizing: border-box;


        :hover{
            background-color: #f0f0f0;
        }
    }
`;

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.listData
        };
    }


    render() {
        const concerts = this.state.items;
        if (concerts.concertList) {
            return (
                <StyledContainer isVisible={this.props.isVisible}> 
                    {Object.values(concerts.concertList).map((concert, index) => (
                        <li key={'concert' + index} draggableId={'concert' + index} index={index}>
                            {concert.concertName}
                        </li>
                    )
                    )}
                </StyledContainer>
            );
        } else {
            return null
        }
    }
}

export default List
