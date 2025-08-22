import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;

  img {
    height: 50px;
    width: auto;
    object-fit: contain;
  }
`;

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <img src="/logo512.png" alt="foo-rum logo" />
    </LogoContainer>
  );
};

export default Logo;
