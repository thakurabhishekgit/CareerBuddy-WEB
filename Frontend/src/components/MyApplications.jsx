import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not applied to any college.
        </h1>
      ) : (
        <div className="account-components">
          <h3 className="applications-heading">My Applications for Jobs</h3>
          <div className="applications-container">
            {applications.map((element) => (
              <div className="application-card" key={element._id}>
                <p className="application-detail">
                  <span>Role: </span> {element.jobInfo.jobTitle}
                </p>
                <p className="application-detail">
                  <span>Name: </span> {element.jobSeekerInfo.name}
                </p>
                <p className="application-detail">
                  <span>Email: </span> {element.jobSeekerInfo.email}
                </p>
                <p className="application-detail">
                  <span>Phone: </span> {element.jobSeekerInfo.phone}
                </p>
                <p className="application-detail">
                  <span>Address: </span> {element.jobSeekerInfo.address}
                </p>
                <p className="application-detail">
                  <span>Cover Letter: </span>
                  <textarea
                    value={element.jobSeekerInfo.coverLetter}
                    rows={5}
                    disabled
                  ></textarea>
                </p>
                <div className="button-wrapper">
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteApplication(element._id)}
                  >
                    Delete Application
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <style>
        {`
          .account-components {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            max-width: 800px;
            margin: auto;
          }
          .applications-heading {
            color: black;
          }
          .applications-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
          }
          .application-card {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .application-detail {
            margin-bottom: 10px;
          }
          .application-detail span {
            font-weight: 600;
          }
          .button-wrapper {
            text-align: right;
            margin-top: 15px;
          }
          .delete-button {
            background: none;
            border: 1px solid #007bff;
            color: #007bff;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
          }
          .delete-button:hover {
            background-color: #007bff;
            color: white;
          }
          textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            resize: none;
          }
        `}
      </style>
    </>
  );
};

export default MyApplications;