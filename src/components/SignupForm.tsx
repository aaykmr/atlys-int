import React, { useState } from "react";
import { SignupFormData } from "../types/auth";
import { registerUser, isEmail } from "../utils/auth";
import {
  AuthForm,
  FormGroup,
  ErrorMessage,
  SubmitButton,
  AuthSwitch,
  SwitchButton,
} from "../styles/AuthStyles";

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
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const getIdentifierLabel = () => {
    return isEmail(formData.identifier) ? "Email" : "Username";
  };

  return (
    <AuthForm>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="identifier">{getIdentifierLabel()}</label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleInputChange}
            className={errors.identifier ? "error" : ""}
            placeholder="Enter your email or username"
          />
          {errors.identifier && (
            <ErrorMessage>{errors.identifier}</ErrorMessage>
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
            className={errors.password ? "error" : ""}
            placeholder="Enter your password"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            className={errors.repeatPassword ? "error" : ""}
            placeholder="Repeat your password"
          />
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

      <AuthSwitch>
        <p>
          Already have an account?{" "}
          <SwitchButton type="button" onClick={onSwitchToLogin}>
            Login
          </SwitchButton>
        </p>
      </AuthSwitch>
    </AuthForm>
  );
};

export default SignupForm;
