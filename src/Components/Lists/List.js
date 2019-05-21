import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//#region Styles
const StyledContainer = styled.ul`
    position: absolute;
    transition: .2s ease-in-out;
    transform: ${props=>props.isVisible ? 'scale(1)' : 'scale(0)'};
    opacity: ${props => props.isVisible ? '1' : '0'};
    padding-left: 0px;
    width: 100%;
    height: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    z-index: 900;

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
//#endregion Styles

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.listData
        };
    }


    render() {
        const concerts = this.state.items;
        const {isVisible} = this.props;

        if (concerts.concertList) {
            return (
                <StyledContainer isVisible={isVisible}> 
                    {Object.values(concerts.concertList).map((concert, index) => (
                        <li key={concert.key} index={index}>
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

List.propTypes = {
    isVisible: PropTypes.bool
}

export default List
