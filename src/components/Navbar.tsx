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
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onBackToHome?: () => void;
  isOnAuthPage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  onLogout,
  onLoginClick,
  onBackToHome,
  isOnAuthPage,
}) => {
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
              <LogoutButton onClick={onLogout}>
                Logout
                <LogoutIcon fontSize="small" />
              </LogoutButton>
            </>
          ) : (
            <LogoutButton onClick={onBackToHome || onLoginClick}>
              {onBackToHome && isOnAuthPage ? (
                <>Back to home</>
              ) : (
                <>
                  Login
                  <LoginIcon fontSize="small" />
                </>
              )}
            </LogoutButton>
          )}
        </UserInfo>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
