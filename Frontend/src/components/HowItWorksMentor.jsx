
import React from "react";
import { Link } from "react-router-dom";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorksMentor = () => {
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
            <h4>lol</h4>
            <p>
              Sign up for a free account as a job seeker or employer. Set up
              your profile in minutes to start posting jobs or applying for
              jobs. Customize your profile to highlight your skills or
              requirements.
            </p>
          </Link>
          <Link to="/jobs" className="card">
            <div className="icon">
              <VscTasklist />
            </div>
            <h4>Post or Browse Jobs</h4>
            <p>
              Employers can post detailed job descriptions, and job seekers can
              browse a comprehensive list of available positions. Utilize
              filters to find jobs that match your skills and preferences.
            </p>
          </Link>
          <Link to="/predict" className="card">
            <div className="icon">
              <BiSolidLike />
            </div>
            <h4>Predict your Content</h4>
            <p>
              Employers can shortlist candidates and extend job offers. Job
              seekers can review job offers and accept positions that align with
              their career goals.
            </p>
          </Link>
          <Link to="/jobs" className="card">
            <div className="icon">
              <VscTasklist />
            </div>
            <h4>Post or Browse Jobs</h4>
            <p>
              Employers can post detailed job descriptions, and job seekers can
              browse a comprehensive list of available positions. Utilize
              filters to find jobs that match your skills and preferences.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HowItWorksMentor;
        
        
        