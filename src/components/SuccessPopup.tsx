import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styled, { keyframes } from "styled-components";

interface SuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
`;

const checkmarkAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const confettiAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
`;

const PopupOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${(props) => (props.isVisible ? fadeIn : fadeOut)} 0.3s ease-out;
  animation-fill-mode: forwards;
`;

const PopupContainer = styled.div<{ isVisible: boolean }>`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  position: relative;
  overflow: hidden;
  animation: ${(props) => (props.isVisible ? fadeIn : fadeOut)} 0.3s ease-out
    0.1s;
  animation-fill-mode: forwards;
`;

const SuccessIcon = styled.div`
  margin-bottom: 1.5rem;

  svg {
    font-size: 4rem;
    color: #4caf50;
    animation: ${checkmarkAnimation} 0.6s ease-out 0.3s both;
  }
`;

const Title = styled.h2`
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 1.8rem;
  font-weight: 600;
`;

const Message = styled.p`
  color: #666;
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Confetti = styled.div<{ delay: number; left: number }>`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${(props) => {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }};
  border-radius: 50%;
  top: 100%;
  left: ${(props) => props.left}%;
  animation: ${confettiAnimation} 1s ease-out ${(props) => props.delay}s both;
  animation-fill-mode: forwards;
`;

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isVisible,
  onClose,
  message,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <PopupOverlay isVisible={isVisible} onClick={onClose}>
      <PopupContainer
        isVisible={isVisible}
        onClick={(e) => e.stopPropagation()}
      >
        {showConfetti && (
          <>
            {[...Array(12)].map((_, i) => (
              <Confetti key={i} delay={i * 0.1} left={Math.random() * 100} />
            ))}
          </>
        )}

        <SuccessIcon>
          <CheckCircleIcon />
        </SuccessIcon>

        <Title>Success!</Title>
        <Message>{message}</Message>

        <CloseButton onClick={onClose}>Continue</CloseButton>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default SuccessPopup;
