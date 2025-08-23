import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GlobalStyles from "./styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";

// Component to handle GitHub Pages routing
const GitHubPagesRouter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle GitHub Pages routing with query parameters
    const query = new URLSearchParams(location.search);
    const redirectPath = query.get("/");

    if (redirectPath) {
      // Clean up the path and navigate
      const cleanPath = redirectPath.replace(/~and~/g, "&");
      console.log("Redirecting to:", cleanPath); // Debug log
      navigate(cleanPath, { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Feed />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <GitHubPagesRouter />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
