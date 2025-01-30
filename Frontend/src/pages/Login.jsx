import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <section className="auth-page">
        <div className="auth-container">
          <div className="auth-info">
            <h3>Welcome to CareerBuddy</h3>
            <p>
              Login with your email and password to access your account. and
              enjoy the experience.
            </p>
            <img
              src="data:image/jpeg;base64,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"
              alt="Welcome"
            />
          </div>
          <div className="auth-form">
            <div className="auth-header">
              <h3>Login to your account</h3>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Login As</label>
                <div className="input-wrapper">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Login as a College Admin</option>
                    <option value="Job Seeker">Login as a Student</option>
                    <option value="SchoolAdmin">Login as a School Admin</option>
                  </select>
                  <FaRegUser className="input-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    placeholder="youremail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MdOutlineMailOutline className="input-icon" />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <RiLock2Fill className="input-icon" />
                </div>
              </div>
              <button type="submit" disabled={loading}>
                Login
              </button>
              <Link to={"/register"}>Register Now</Link>
            </form>
          </div>
        </div>
      </section>
      <style jsx>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: white;
        }
        .auth-container {
          display: flex;
          background: white;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 80%;
          max-width: 800px;
          overflow: hidden;
        }
        .auth-info {
          width: 50%;
          padding: 40px;
          background: #f7f7f7;
          text-align: center;
        }
        .auth-info h3 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }
        .auth-info p {
          margin-bottom: 20px;
          font-size: 16px;
          color: #555;
        }
        .auth-info img {
          max-width: 100%;
          border-radius: 10px;
        }
        .auth-form {
          width: 50%;
          padding: 40px;
          text-align: center;
        }
        .auth-header h3 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }
        .form-group label {
          margin-bottom: 5px;
          display: block;
          color: #333;
        }
        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-wrapper input,
        .input-wrapper select {
          width: 100%;
          padding: 10px 40px 10px 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .input-icon {
          position: absolute;
          right: 10px;
          color: #999;
        }
        button {
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: #6e8efb;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #a777e3;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        a {
          margin-top: 10px;
          color: #6e8efb;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Login;