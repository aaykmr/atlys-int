# Atlys React App

A modern React TypeScript application with authentication functionality, featuring login/signup components and a beautiful UI.

## Features

- **Authentication System**: Complete login and signup functionality
- **Email/Username Detection**: Automatically detects if input is email or username
- **Form Validation**: Comprehensive client-side validation
- **Modal Authentication**: Login/signup modal for unauthenticated users
- **Local Storage**: User data persistence using localStorage
- **Responsive Design**: Mobile-friendly interface
- **TypeScript**: Full TypeScript support for type safety

## Tech Stack

- React 18
- TypeScript
- React Router DOM
- Styled Components for styling
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js 22.16.0 (specified in .nvmrc)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── Login.tsx       # Login form component
│   ├── Modal.tsx       # Reusable modal component
│   ├── Signup.tsx      # Signup form component
│   ├── Auth.css        # Authentication styles
│   └── Modal.css       # Modal styles
├── pages/              # Page components
│   ├── Home.tsx        # Home page with dashboard
│   ├── Auth.tsx        # Dedicated auth page
│   ├── Home.css        # Home page styles
│   └── Auth.css        # Auth page styles
├── types/              # TypeScript type definitions
│   └── auth.ts         # Authentication types
├── utils/              # Utility functions
│   └── auth.ts         # Authentication utilities
└── App.tsx             # Main application component
```

## Authentication Features

### Login

- Accepts email or username
- Password validation
- Auto-detection of email vs username format
- Error handling and user feedback

### Signup

- Email or username registration
- Email validation for email format
- Username validation (3+ characters, alphanumeric + underscore)
- Password confirmation
- Duplicate user prevention

### Data Storage

- User data stored in localStorage as JSON
- Current user session management
- Secure password handling (client-side only)
- Demo users always available for testing:
  - `demo@example.com` / `password123`
  - `test@user.com` / `testpass`

## Usage

### Demo Users

The application comes with two demo users that are always available for testing:

- **Email**: `demo@example.com` | **Password**: `password123`
- **Email**: `test@user.com` | **Password**: `testpass`

These demo users are automatically created when the app is first loaded and cannot be deleted or overwritten.

### Home Page (`/`)

- Shows authentication modal if user is not logged in
- Displays user dashboard when authenticated
- Logout functionality
- Coding area for future development

### Login Page (`/login`)

- Dedicated login page
- Direct access to login form
- Link to signup page

### Signup Page (`/signup`)

- Dedicated signup page
- Direct access to signup form
- Link to login page

## Development

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

### Node Version

This project uses Node.js 22.16.0. Use `nvm use` to automatically switch to the correct version.

## Styling

The application uses Styled Components with:

- CSS-in-JS for component-scoped styling
- Responsive design with media queries
- Smooth animations and transitions
- Glassmorphism effects
- Modern gradient backgrounds

## Future Enhancements

- Backend API integration
- JWT token authentication
- Password hashing
- User profile management
- Social login options
- Password reset functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
