import { User, LoginFormData, SignupFormData } from "../types/auth";

const USERS_FILE = "users.json";

// Check if identifier is email
export const isEmail = (identifier: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(identifier);
};

// Default demo users that should always be present
const DEFAULT_USERS: User[] = [
  {
    id: "demo1",
    email: "demo@example.com",
    password: "password123",
  },
  {
    id: "demo2",
    email: "test@user.com",
    password: "testpass",
  },
];

// Get users from localStorage
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_FILE);
  const storedUsers = users ? JSON.parse(users) : [];

  // Ensure default users are always present
  const defaultUserIds = DEFAULT_USERS.map((user) => user.id);
  const existingUsers = storedUsers.filter(
    (user: User) => !defaultUserIds.includes(user.id)
  );

  // Combine default users with existing users
  const allUsers = [...DEFAULT_USERS, ...existingUsers];

  // Save back to localStorage to ensure defaults are always there
  if (storedUsers.length === 0) {
    saveUsers(allUsers);
  }

  return allUsers;
};

// Save users to localStorage
export const saveUsers = (users: User[]): void => {
  // Ensure default users are never deleted
  const defaultUserIds = DEFAULT_USERS.map((user) => user.id);
  const existingUsers = users.filter(
    (user) => !defaultUserIds.includes(user.id)
  );
  const allUsers = [...DEFAULT_USERS, ...existingUsers];

  localStorage.setItem(USERS_FILE, JSON.stringify(allUsers));
};

// Register new user
export const registerUser = (
  formData: SignupFormData
): { success: boolean; message: string } => {
  const users = getUsers();

  // Check if passwords match
  if (formData.password !== formData.repeatPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  // Check if email already exists
  if (isEmail(formData.identifier)) {
    const existingUser = users.find(
      (user) => user.email === formData.identifier
    );
    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }
  }

  // Check if username already exists
  const existingUsername = users.find(
    (user) => user.username === formData.username
  );
  if (existingUsername) {
    return { success: false, message: "Email/username already taken" };
  }

  // Prevent registration with demo email addresses
  const demoEmails = ["demo@example.com", "test@user.com"];
  if (
    isEmail(formData.identifier) &&
    demoEmails.includes(formData.identifier)
  ) {
    return {
      success: false,
      message: "This email is reserved for demo purposes",
    };
  }

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    username: formData.username,
    password: formData.password,
  };

  // Set email if identifier is an email
  if (isEmail(formData.identifier)) {
    newUser.email = formData.identifier;
  }

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: "Registration successful" };
};

// Login user
export const loginUser = (
  formData: LoginFormData
): { success: boolean; message: string; user?: User } => {
  const users = getUsers();

  const user = users.find(
    (user) =>
      (user.email && user.email === formData.identifier) ||
      (user.username && user.username === formData.identifier)
  );

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.password !== formData.password) {
    return { success: false, message: "Invalid password" };
  }

  // Set current user in localStorage
  setCurrentUser(user);

  return { success: true, message: "Login successful", user };
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

// Set current user in localStorage
export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
};
