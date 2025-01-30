
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { logout } from "../store/slices/userSlice"; // Ensure you have a logout action

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      setShowModal(false); // Hide the modal after successful logout
    });
  };

  const isEmployer = user?.role === "Employer";
  const isSchoolAdmin = user?.role === "SchoolAdmin";
  const isStudent = user?.role === "Job Seeker";
  return (
    <>
      <Nav className={show ? "navbar navbar--active" : "navbar"}>
        <Logo>
          <img
            src="https://i.pinimg.com/474x/57/7c/f3/577cf3e613d12d4eca981cb3a41a058e.jpg"
            alt="logo"
          />
          <h2>
            CareerBuddy <br />
            <span>
              <h6>Welcome to CareerBuddy!!</h6>
            </span>
          </h2>
        </Logo>
        <Links
          className={
            show ? "navbar_links navbarlinks--active" : "navbar_links"
          }
        >
          <ul>
            <li>
              <Link to="/" onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            {!isEmployer && !isSchoolAdmin && (
              <>
                <li>
                  <Link to="/predict" onClick={() => setShow(false)}>
                    Predict
                  </Link>
                </li>
                <li>
                  <Link to="/generate-content" onClick={() => setShow(false)}>
                    Generate
                  </Link>
                </li>
                <li>
                  <Link to="/mentor" onClick={() => setShow(false)}>
                    Mentor
                  </Link>
                </li>
              </>
            )}
            {isSchoolAdmin && (
              <>
                <li>
                  <Link to="/SchoolAdmin" onClick={() => setShow(false)}>
                    My Students
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/jobs" onClick={() => setShow(false)}>
                Colleges
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" onClick={() => setShow(false)}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(true);
                    }}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={() => setShow(false)}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </Links>
        <Hamburger onClick={() => setShow(!show)} />
      </Nav>
      <MainContent>{/* Your main content goes here */}</MainContent>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>Confirm Logout</h2>
            </ModalHeader>
            <img
              src="data:image/png;base64,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"
              alt="lol"
            />
            <ButtonContainer>
              <button onClick={handleLogout}>Yes, Logout</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #333;
  color: #fff;
  height: 75px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &.navbar--active {
    background-color: #444;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  h6 {
    font-size: 14px;
    font-weight: 300;
    margin: 0;
    color: #fff;
    text-transform: uppercase;
  }
`;

const Links = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0 15px;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    position: relative;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #1e90ff;
  }

  &.navbar__links--active {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 70px;
    left: 0;
    background-color: #333;
    padding: 0;
    margin: 0;
    z-index: 1000;

    ul {
      flex-direction: column;
      align-items: center;
    }

    li {
      margin: 10px 0;
    }
  }
`;

const Hamburger = styled(GiHamburgerMenu)`
  font-size: 24px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MainContent = styled.div`
  padding-top: 70px; /* Height of the navbar */
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px; /* Increased padding for more space inside the modal */
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 400px; /* Increased width for a larger modal */
  max-width: 90%; /* Ensure modal doesn't overflow on smaller screens */
`;

const ModalHeader = styled.div`
  margin-bottom: 20px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;

  button {
    margin: 0;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    outline: none;
  }

  button:first-of-type {
    background-color: #007bff;
    color: #fff;
  }

  button:first-of-type:hover {
    background-color: #0056b3;
  }

  button:last-of-type {
    background-color: #ccc;
  }

  button:last-of-type:hover {
    background-color: #aaa;
  }
`;

export default Navbar;