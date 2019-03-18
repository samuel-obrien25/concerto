import React from 'react';
import SlideIn from './SlideIn';
import styled from 'styled-components';


function Loading(props) {

    // #region STYLES
    const StyledLoading = styled.div`
        margin: auto;
    `;
    // #endregion STYLES



    return (
        <SlideIn animDuration="300ms" animFillMode="forwards" animDelay="500ms">
            <StyledLoading>loading</StyledLoading>
        </SlideIn>
    );
}

export default Loading;
