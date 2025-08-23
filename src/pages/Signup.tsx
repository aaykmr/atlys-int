import React from "react";
import { useNavigate, Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import Navbar from "../components/Navbar";
import { AuthPage, AuthContainer } from "../styles/AuthPageStyles";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    // After successful signup, redirect to login
    navigate("/login");
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
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
        <SignupForm
          onSwitchToLogin={handleSwitchToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
      </AuthContainer>
    </AuthPage>
  );
};

export default SignupPage;
