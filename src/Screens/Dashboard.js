import React, { useEffect, useState } from 'react';
import SlideIn from '../Utilities/SlideIn';
import SlideOut from '../Utilities/SlideOut';

import styled from 'styled-components';
import NavDrawer from '../Components/Menu/NavDrawer';

//#region Styles
const StyledDashboard = styled.section`
    position: fixed;
    left: 0;
    width: 100%;
    height: 100vh;
    background:linear-gradient(to top left, #FDC830, #F37335);
    display: flex;
    flex-direction: column;
`;

// #endregion
function Dashboard(props) {
    const [activeUserData, setActiveUserData] = useState(props.activeUser)

    return (
            <SlideIn animDelay="0s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText="false" >
                <StyledDashboard>
                    <NavDrawer name = { activeUserData.displayName }/>
                </StyledDashboard>
            </SlideIn>
        );
    }
export default Dashboard;
