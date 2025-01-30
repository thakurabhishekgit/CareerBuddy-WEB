// App.jsx
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import GenerateContent from "./components/GenerateContent";
import First from "./pages/First";
import PrivateRoute from "./pages/PrivateRoute"; // Import the PrivateRoute component
import Mentor from "./pages/Mentor";
import SchoolAdminPage from "./pages/SchoolAdminPage";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<First />} />
          <Route
            path="/predict"
            element={<PrivateRoute element={<Home />} />}
          />
          <Route
            path="/mentor"
            element={<PrivateRoute element={<Mentor />} />}
          />
          <Route path="/jobs" element={<PrivateRoute element={<Jobs />} />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/post/application/:jobId"
            element={<PrivateRoute element={<PostApplication />} />}
          /><Route
          path="/SchoolAdmin"
          element={<PrivateRoute element={<SchoolAdminPage />} />}
        />
          <Route path="/first" element={<First />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/generate-content"
            element={<PrivateRoute element={<GenerateContent />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" theme="dark" />
      </Router>
    </>
  );
};

export default App;
