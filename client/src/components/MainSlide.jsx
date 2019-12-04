import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.image`
    padding-left: 150px;
    padding-right: 150px;
`;

const MainSlide = (props) => (

  <StyledImg>
    <img src={props.list} width="700" height="700" />
  </StyledImg>

)

export default MainSlide;