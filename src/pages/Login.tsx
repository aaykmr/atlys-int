import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import { AuthPage, AuthContainer } from "../styles/AuthPageStyles";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Get the user from localStorage (set by loginUser)
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      navigate("/");
    }
  };

  const handleSwitchToSignup = () => {
    navigate("/signup");
  };

  return (
    <AuthPage>
      <Navbar
        user={null}
        onLogout={() => {}}
        onLoginClick={() => {}}
        onBackToHome={() => navigate("/")}
        isOnAuthPage={true}
      />
      <AuthContainer>
        <LoginForm
          onSwitchToSignup={handleSwitchToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      </AuthContainer>
    </AuthPage>
  );
};

export default LoginPage;
