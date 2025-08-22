import React from "react";
import { User } from "../types/auth";
import Logo from "./Logo";
import {
  NavbarContainer,
  NavbarContent,
  NavbarTitle,
  UserInfo,
  LogoutButton,
} from "../styles/NavbarStyles";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onLoginClick }) => {
  return (
    <NavbarContainer>
      <NavbarContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo />
          <NavbarTitle>foo-rum</NavbarTitle>
        </div>
        <UserInfo>
          {user ? (
            <>
              <span>Hello, {user.username}!</span>
              <LogoutButton onClick={onLogout}>Logout</LogoutButton>
            </>
          ) : (
            <LogoutButton onClick={onLoginClick}>Login / Sign Up</LogoutButton>
          )}
        </UserInfo>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
