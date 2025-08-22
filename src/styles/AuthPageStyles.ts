import styled from "styled-components";

export const AuthPage = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const AuthContainer = styled.div`
  width: 100%;
  max-width: 450px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const AuthLink = styled.a`
  color: #fff;
  text-decoration: underline;
  font-weight: 600;
  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`;
