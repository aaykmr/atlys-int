import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { SignupFormData } from "../types/auth";
import { registerUser, isEmail } from "../utils/auth";

import {
  AuthForm,
  AuthFormContent,
  AuthFormWrapper,
  AuthIconContainer,
  AuthIconCircle,
  AuthSubtitle,
  FormGroup,
  ValidationIcon,
  ErrorMessage,
  SubmitButton,
  AuthSwitch,
  SwitchButton,
} from "../styles/AuthStyles";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  onSwitchToLogin,
  onSignupSuccess,
}) => {
  const [formData, setFormData] = useState<SignupFormData>({
    identifier: "",
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    identifier: { isValid: false, hasValue: false },
    username: { isValid: false, hasValue: false },
    password: { isValid: false, hasValue: false },
    repeatPassword: { isValid: false, hasValue: false },
  });
  const [isVisible, setIsVisible] = useState(true);

  // Auto-generate username from email
  const generateUsernameFromEmail = (email: string): string => {
    return email.split("@")[0];
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or username is required";
    } else {
      // Validate email if it's an email
      if (isEmail(formData.identifier)) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.identifier)) {
          newErrors.identifier = "Please enter a valid email address";
        }
      } else {
        // Validate username
        if (formData.identifier.length < 3) {
          newErrors.identifier = "Username must be at least 3 characters";
        }
        if (!/^[a-zA-Z0-9_]+$/.test(formData.identifier)) {
          newErrors.identifier =
            "Username can only contain letters, numbers, and underscores";
        }
      }
    }

    // Validate username field
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    // If identifier is an email, ensure username is auto-generated
    if (isEmail(formData.identifier) && !formData.username.trim()) {
      newErrors.username = "Username will be auto-generated from your email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.repeatPassword) {
      newErrors.repeatPassword = "Please repeat your password";
    } else if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = registerUser(formData);

      if (result.success) {
        onSignupSuccess();
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: "An error occurred during registration" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Auto-populate username when email is entered
    if (name === "identifier" && isEmail(value)) {
      const generatedUsername = generateUsernameFromEmail(value);
      setFormData((prev) => ({ ...prev, username: generatedUsername }));

      // Update username validation - username is always valid when auto-generated from email
      const usernameHasValue = generatedUsername.trim().length > 0;
      const usernameIsValid = generatedUsername.trim().length >= 3;

      setValidation((prev) => ({
        ...prev,
        username: { isValid: usernameIsValid, hasValue: usernameHasValue },
      }));
    }

    // Update validation state
    const hasValue = value.trim().length > 0;
    let isValid = false;

    if (name === "identifier") {
      if (isEmail(value)) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = hasValue && emailRegex.test(value);
      } else {
        isValid =
          hasValue && value.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
      }
    } else if (name === "username") {
      isValid =
        hasValue && value.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
    } else if (name === "password") {
      isValid = hasValue && value.length >= 6;
    } else if (name === "repeatPassword") {
      isValid = hasValue && value === formData.password;
    }

    setValidation((prev) => ({
      ...prev,
      [name]: { isValid, hasValue },
    }));
  };

  const getIdentifierLabel = () => {
    return isEmail(formData.identifier) ? "Email" : "Username";
  };

  const handleSwitchToLogin = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSwitchToLogin();
    }, 200);
  };

  return (
    <AuthForm>
      <AuthFormWrapper isVisible={isVisible}>
        <AuthFormContent>
          <AuthIconContainer>
            <AuthIconCircle>
              <LoginIcon style={{ fontSize: "2rem", color: "#333" }} />
            </AuthIconCircle>
          </AuthIconContainer>
          <h2>Create an account to continue</h2>
          <AuthSubtitle>
            Create an account to access all the features on this app
          </AuthSubtitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="identifier">{getIdentifierLabel()}</label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleInputChange}
                className={
                  errors.identifier
                    ? "error"
                    : validation.identifier.hasValue &&
                      validation.identifier.isValid
                    ? "success"
                    : ""
                }
                placeholder="Enter your email or username"
              />
              <ValidationIcon
                isValid={validation.identifier.isValid}
                hasValue={validation.identifier.hasValue}
              >
                {validation.identifier.isValid && <VerifiedRoundedIcon />}
              </ValidationIcon>
              {errors.identifier && (
                <ErrorMessage>{errors.identifier}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="username">Username (Auto-generated)</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                readOnly
                className={
                  errors.username
                    ? "error"
                    : validation.username.hasValue &&
                      validation.username.isValid
                    ? "success"
                    : ""
                }
                placeholder="Username will be auto-generated"
                style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
              />
              <ValidationIcon
                isValid={validation.username.isValid}
                hasValue={validation.username.hasValue}
              >
                {validation.username.isValid && <VerifiedRoundedIcon />}
              </ValidationIcon>
              {errors.username && (
                <ErrorMessage>{errors.username}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={
                  errors.password
                    ? "error"
                    : validation.password.hasValue &&
                      validation.password.isValid
                    ? "success"
                    : ""
                }
                placeholder="Enter your password"
              />
              <ValidationIcon
                isValid={validation.password.isValid}
                hasValue={validation.password.hasValue}
              >
                {validation.password.isValid && <VerifiedRoundedIcon />}
              </ValidationIcon>
              {errors.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleInputChange}
                className={
                  errors.repeatPassword
                    ? "error"
                    : validation.repeatPassword.hasValue &&
                      validation.repeatPassword.isValid
                    ? "success"
                    : ""
                }
                placeholder="Repeat your password"
              />
              <ValidationIcon
                isValid={validation.repeatPassword.isValid}
                hasValue={validation.repeatPassword.hasValue}
              >
                {validation.repeatPassword.isValid && <VerifiedRoundedIcon />}
              </ValidationIcon>
              {errors.repeatPassword && (
                <ErrorMessage>{errors.repeatPassword}</ErrorMessage>
              )}
            </FormGroup>

            {errors.general && (
              <ErrorMessage className="general">{errors.general}</ErrorMessage>
            )}

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </SubmitButton>
          </form>
        </AuthFormContent>

        <AuthSwitch>
          <p>
            Already have an account?{" "}
            <SwitchButton type="button" onClick={handleSwitchToLogin}>
              Sign In
            </SwitchButton>
          </p>
        </AuthSwitch>
      </AuthFormWrapper>
    </AuthForm>
  );
};

export default SignupForm;
