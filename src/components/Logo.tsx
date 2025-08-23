import React from "react";
import styled from "styled-components";
import logoImage from "../assets/images/logo512.png";

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
      <img src={logoImage} alt="foo-rum logo" />
    </LogoContainer>
  );
};

export default Logo;
