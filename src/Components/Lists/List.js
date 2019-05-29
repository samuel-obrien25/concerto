import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

//#region Styles
const ListWrapper = styled.section`
    display: grid;
    grid-template-columns: 40% 35% 25%;
    position: absolute;
    top: 100px;
    transition: ${props => props.isVisible ? '.2s ease-in-out' : '.0s ease-in-out'};
    transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0)'};
    opacity: ${props => props.isVisible ? '1' : '0'};
    padding-left: 0px;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    z-index: 900;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;

    h2{
        font-size: 16px;
        text-transform: uppercase;
        text-align: left;
        padding-left: 15px;
    }
    h3{
        font-weight: 400;
        font-size: 14px;
        transition: .25s ease-in-out;
        position: relative;
        padding: 5px 15px;

        :before{
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            height: 14px;
            padding: 10px 0px;
            width: 96vw;
            background-color: #f0f0f0;
            transform: scaleY(0);
            transform-origin: bottom;
            transition: .2s ease-in-out;
            z-index: -1;
        }

        &:hover{
            &:before{
                transform: scaleY(1);
            }
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

        function formatDate(concertDate){
            let splitDate = concertDate.split('-');
            let formattedDate = [];

            formattedDate.push(splitDate[1]);
            formattedDate.push(splitDate[2]);
            formattedDate.push(splitDate[0]);

            return formattedDate.join('-');
        }
        if (concerts.concertList) {
            return (
                <ListWrapper isVisible = {isVisible}>
                    <Column>
                        <h2>Artist</h2>
                            <div>
                            {Object.values(concerts.concertList).map((concert, index) => (
                                <h3 key={concert.concertKey} index={index}>
                                    {concert.bandName}
                                </h3>
                            )
                            )}
                            </div>
                    </Column>
                    <Column>
                        <h2>Venue</h2>
                        <div>
                            {Object.values(concerts.concertList).map((concert, index) => (
                                <h3 key={concert.concertKey} index={index}>
                                    {concert.venueName}
                                </h3>
                            )
                            )}
                        </div>

                    </Column>
                    <Column>
                        <h2>Date</h2>
                        <div>
                            {Object.values(concerts.concertList).map((concert, index) => (
                                <h3 key={concert.concertKey} index={index}>
                                    {formatDate(concert.concertDate)}
                                </h3>
                            )
                            )}
                        </div>

                    </Column>
                </ListWrapper>

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
