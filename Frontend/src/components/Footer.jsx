import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <style jsx>{`
        .footer {
          background: #1f1f1f;
          color: #e0e0e0;
          padding: 40px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: space-between;
        }

        .footer img {
          max-width: 150px;
          height: auto;
        }

        .footer h4 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: #f0f0f0;
        }

        .footer ul {
          list-style: none;
          padding: 0;
        }

        .footer ul li {
          margin-bottom: 10px;
        }

        .footer ul li a {
          color: #e0e0e0;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer ul li a:hover {
          color: #ff6f61;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-links a {
          color: #e0e0e0;
          font-size: 1.5rem;
          transition: color 0.3s;
          display: flex;
          align-items: center;
        }

        .social-links a:hover {
          color: #ff6f61;
        }

        .social-links span {
          margin-left: 8px;
        }

        .footer-bottom {
          background: #121212;
          color: #9e9e9e;
          text-align: center;
          padding: 15px;
          margin-top: 20px;
          font-size: 0.875rem;
        }
      `}</style>
      <footer className="footer">
        <div>
          <img
            src="data:image/jpeg;base64,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"
            alt="logo"
          />
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>India, Hyderabad, Mehdipatnam</li>
            <li>careerbuddy@gmail.com</li>
            <li>+91 95530 26517</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Predict</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-links">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
              <span>Twitter</span>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
              <span>YouTube</span>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        &copy; 2024 Team-tech. All Rights Reserved.
      </div>
    </>
  );
};

export default Footer;