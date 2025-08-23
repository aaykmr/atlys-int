import styled from "styled-components";

export const AuthForm = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: #e5e5e5;
  border-radius: 28px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.8rem;
  position: relative;
  overflow: hidden;
`;

export const AuthFormWrapper = styled.div<{ isVisible: boolean }>`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(10px)"};
  transition: all 0.2s ease-out;
  position: relative;
  width: 100%;
`;

export const AuthFormContent = styled.div`
  padding: 2rem;
  border-radius: 24px;
  background: #fff;

  h2 {
    text-align: center;
    margin-bottom: 0.5rem;
    color: #000;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

export const AuthSubtitle = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const AuthIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const AuthIconCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #000;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    padding-right: 2.5rem;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s ease;
    box-sizing: border-box;
    background: #f5f5f5;
    color: #333;

    &::placeholder {
      color: #999;
    }

    &:focus {
      outline: none;
      background: #f0f0f0;
      box-shadow: 0 0 0 2px rgba(81, 77, 192, 0.25);
    }

    &.error {
      background: #fff5f5;
      animation: shake 0.5s ease-in-out;
    }

    &.success {
      background: #f0fff4;
      box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
    }
  }
`;

export const ValidationIcon = styled.div<{
  isValid: boolean;
  hasValue: boolean;
}>`
  position: absolute;
  right: 0.75rem;
  top: 70%;
  transform: translateY(-50%);
  opacity: ${(props) => (props.hasValue ? 1 : 0)};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  // background: ${(props) => (props.isValid ? "#22c55e" : "transparent")};
  color: #22c55e;
  font-size: 14px;

  svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;

export const PasswordStrengthIndicator = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StrengthBar = styled.div<{ strength: number }>`
  flex: 1;
  height: 4px;
  background: #e5e5e5;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.strength * 25}%;
    background: ${(props) => {
      if (props.strength <= 1) return "#ef4444"; // red
      if (props.strength <= 2) return "#f97316"; // orange
      if (props.strength <= 3) return "#eab308"; // yellow
      return "#22c55e"; // green
    }};
    transition: all 0.3s ease;
    transform: translateX(-100%);
    animation: slideIn 0.5s ease forwards;
  }
`;

export const StrengthText = styled.span<{ strength: number }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => {
    if (props.strength <= 1) return "#ef4444";
    if (props.strength <= 2) return "#f97316";
    if (props.strength <= 3) return "#eab308";
    return "#22c55e";
  }};
  min-width: 60px;
  text-align: right;
`;

export const ErrorMessage = styled.span`
  color: rgb(201, 79, 91);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;

  &.general {
    text-align: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 12px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: rgb(81, 77, 192);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: rgb(65, 62, 154);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(81, 77, 192, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const AuthSwitch = styled.div`
  text-align: center;
  padding: 1rem 2rem;
  background: #e5e5e5;

  p {
    margin: 0;
    color: #666;
    font-size: 1rem;
  }
`;

export const SwitchButton = styled.button`
  background: none;
  border: none;
  color: rgb(81, 77, 192);
  text-decoration: none;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
  margin: 0;

  &:hover {
    color: rgb(65, 62, 154);
  }
`;

export const ShakeAnimation = styled.div`
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-2px);
    }
    20%,
    40%,
    60%,
    80% {
      transform: translateX(2px);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
