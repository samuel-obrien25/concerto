import React, { Component } from 'react';

//#region Map Styles
//#endregion Map Styles


class RouteData extends Component {
    state = {
        apiResponse: null,
    }

    getBusRouteData = () => {
        //Fetches JSON response from Transit Feeds API
        //fetch("https://api.transitfeeds.com/v1/getFeeds?key=ca16303a-49be-401e-876e-023ddff7fa76&location=105&descendants=1&page=1&limit=10&type=gtfs")
        fetch("https://api.transitfeeds.com/v1/getLatestFeedVersion?key=ca16303a-49be-401e-876e-023ddff7fa76&feed=262")
  
        .then((response) => response.json())
            .then((busRouteDataJSON) => {
                //Set apiResponse' state to the response
                this.setState({
                    apiResponse: busRouteDataJSON,
                });
                //Call mapBusRoutes to work through the JSON response for later use.
                this.mapBusRoutes();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    mapBusRoutes = () => {
        console.log("tranist feed api response: " , this.state.apiResponse);
    }

    componentDidMount() {
        //Run everything on mount
        this.getBusRouteData();
    }

    render() {
            return (
                    <div></div>
                );

        }
}

export default RouteData;
