import React, { useState } from "react";
import { LoginFormData } from "../types/auth";
import { loginUser } from "../utils/auth";
import {
  AuthForm,
  FormGroup,
  ErrorMessage,
  SubmitButton,
  AuthSwitch,
  SwitchButton,
} from "../styles/AuthStyles";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToSignup,
  onLoginSuccess,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const result = loginUser(formData);

      if (result.success && result.user) {
        onLoginSuccess();
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: "An error occurred during login" });
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

  return (
    <AuthForm>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="identifier">Email or Username</label>
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

        {errors.general && (
          <ErrorMessage className="general">{errors.general}</ErrorMessage>
        )}

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </SubmitButton>
      </form>

      <AuthSwitch>
        <p>
          Don't have an account?{" "}
          <SwitchButton type="button" onClick={onSwitchToSignup}>
            Sign up
          </SwitchButton>
        </p>
      </AuthSwitch>
    </AuthForm>
  );
};

export default LoginForm;
