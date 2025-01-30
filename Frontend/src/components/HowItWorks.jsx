import React from "react";
import { Link } from "react-router-dom";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <>
      <style jsx>{`
        .how-it-works {
          padding: 60px 20px;
          background-color: #f4f4f4;
          color: #333;
          text-align: center;
        }

        .how-it-works h3 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 40px;
        }

        .how-it-works .container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .how-it-works .card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 30px;
          max-width: 320px;
          flex: 1 1 300px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none; /* Removes underline */
          color: inherit; /* Inherits color from parent */
        }

        .how-it-works .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
        }

        .how-it-works .icon {
          font-size: 3rem;
          color: #007bff;
          margin-bottom: 20px;
        }

        .how-it-works h4 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .how-it-works p {
          font-size: 1rem;
          color: #666;
        }
      `}</style>
      <section className="how-it-works">
        <h3>How does it work?</h3>
        <div className="container">
          <Link to="/login" className="card">
            <div className="icon">
              <LuUserPlus />
            </div>
            <h4>Create an Account</h4>
            <p>
              Sign up for a free account. Set up your profile and explore more features of our website.
              Customize your profile to a get more detailed analysis of career predictions.  
            </p>
          </Link>
          <Link to="/jobs" className="card">
            <div className="icon">
              <VscTasklist />
            </div>
            <h4>Post and Predict</h4>
            <p>
               Input your academic scores, Preferences, Interests and your personality traits to get probabilities
               of different career zones suitable to you.
               Where you get to know further related proffessions.            </p>
          </Link>
          <Link to="/predict" className="card">
            <div className="icon">
              <BiSolidLike />
            </div>
            <h4>Know your Mentor</h4>
            <p>
              You can select a specific mentor according to your interest areas. Watch their videos
               and earn points . Use these earned points to personally schedule interactions
               Domain Experts.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;