import styled from "styled-components";

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;

  img {
    height: 32px;
    width: auto;
    object-fit: contain;
  }
`;

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  height: 70px;
`;

export const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavbarTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #007bff;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;

  span {
    font-weight: 500;
  }
`;

export const LogoutButton = styled.button`
  background: transparent;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  &:hover {
    background: rgb(222, 221, 221);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 1.8rem;
  }
`;
