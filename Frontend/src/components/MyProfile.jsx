import React from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <style>
        {`
          .account_components {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .account_components h3 {
            margin-bottom: 20px;
            font-size: 24px;
            color: #333;
            text-align: center;
          }

          .account_components div {
            margin-bottom: 15px;
          }

          .account_components label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
          }

          .account_components input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #e9ecef;
            color: #333;
            font-size: 16px;
            outline: none;
            cursor: not-allowed;
          }

          .account_components input:disabled {
            background-color: #e9ecef;
          }

          @media (max-width: 768px) {
            .account_components {
              padding: 10px;
            }

            .account_components h3 {
              font-size: 20px;
            }

            .account_components input {
              font-size: 14px;
            }
          }
        `}
      </style>
      <div className="account_components">
        <h3>My Profile</h3>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            disabled
            value={user && user.name}
            onChange={(e) => e.target.value}
          />
        </div>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            disabled
            value={user && user.email}
            onChange={(e) => e.target.value}
          />
        </div>
        {user && user.role === "Job Seeker" && (
          <div>
            <label>My Preferred College Domains</label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <input
                type="text"
                disabled
                value={user && user.niches.firstNiche}
                onChange={(e) => e.target.value}
              />
              <input
                type="text"
                disabled
                value={user && user.niches.secondNiche}
                onChange={(e) => e.target.value}
              />
              <input
                type="text"
                disabled
                value={user && user.niches.thirdNiche}
                onChange={(e) => e.target.value}
              />
            </div>
          </div>
        )}
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            disabled
            value={user && user.phone}
            onChange={(e) => e.target.value}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            disabled
            value={user && user.address}
            onChange={(e) => e.target.value}
          />
        </div>
       
        <div>
          <label>Joined On</label>
          <input
            type="text"
            disabled
            value={user && user.createdAt}
            onChange={(e) => e.target.value}
          />
        </div>
      </div>
    </>
  );
};

export default MyProfile;