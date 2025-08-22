import React, { useState } from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = () => {
    // Get the user from localStorage (set by loginUser)
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      onAuthSuccess();
      onClose();
    }
  };

  const handleSignupSuccess = () => {
    // After successful signup, switch to login
    setIsLogin(true);
  };

  const handleSwitchToSignup = () => {
    setIsLogin(false);
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLogin ? (
        <LoginForm 
          onSwitchToSignup={handleSwitchToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <SignupForm 
          onSwitchToLogin={handleSwitchToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </Modal>
  );
};

export default AuthModal;
