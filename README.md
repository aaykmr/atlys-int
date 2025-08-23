# Foo-rum - Social Media Feed App

A modern, responsive social media feed application built with React, TypeScript, and styled-components. Features include user authentication, rich text editing, post creation, and interactive social features.

## Features

- 🔐 **User Authentication**: Login and signup with validation
- ✍️ **Rich Text Editor**: Create posts with formatting, emojis, and attachments
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎨 **Modern UI**: Clean, professional interface with smooth animations
- 🔄 **Real-time Updates**: Live post creation and interaction
- 💬 **Social Features**: Like, comment, and share posts
- 🎭 **Micro-interactions**: Smooth animations and transitions

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Styled-components, Material-UI icons
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js 22.16.0 (use `nvm use 22.16.0`)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aaykmr/atlys-int.git
cd atlys-int
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Users

The app comes with pre-configured demo users:

- **Email**: `demo@example.com` / **Password**: `password123`
- **Email**: `test@user.com` / **Password**: `testpass`

## Deployment

### GitHub Pages (Automatic)

The app is configured for automatic deployment to GitHub Pages. Every push to the main branch will trigger a deployment.

1. **Enable GitHub Pages**:

   - Go to your repository Settings
   - Navigate to Pages section
   - Select "GitHub Actions" as source

2. **Push to main branch**:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

3. **Monitor deployment**:
   - Check the Actions tab in your repository
   - Deployment will be available at: `https://aaykmr.github.io/atlys-int`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoginForm.tsx   # Login form component
│   ├── SignupForm.tsx  # Signup form component
│   ├── Navbar.tsx      # Navigation component
│   ├── Post.tsx        # Post display component
│   └── RichTextEditor.tsx # Rich text editor
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── Signup.tsx      # Signup page
│   └── Feed.tsx        # Main feed page
├── styles/             # Styled-components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx             # Main app component
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the GitHub repository.
# Updated Sat Aug 23 18:29:55 IST 2025
