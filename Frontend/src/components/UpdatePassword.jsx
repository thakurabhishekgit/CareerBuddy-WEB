import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, error, isUpdated]);

  return (
    <div className="account_components update_password_component">
      <h3>Update Password</h3>
      <div className="input_wrapper">
        <label>Current Password</label>
        <div className="password_input">
          <input
            type={showPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <div className="input_wrapper">
        <label>New Password</label>
        <div className="password_input">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <div className="input_wrapper">
        <label>Confirm Password</label>
        <div className="password_input">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <div className="save_change_btn_wrapper">
        <button
          className="btn"
          onClick={handleUpdatePassword}
          disabled={loading}
        >
          Update Password
        </button>
      </div>
      <style>
        {`
          .account_components {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            max-width: 500px;
            margin: auto;
          }
          .update_password_component h3 {
            margin-bottom: 20px;
            text-align: center;
            color: #333;
          }
          .input_wrapper {
            margin-bottom: 15px;
          }
          .input_wrapper label {
            display: block;
            margin-bottom: 5px;
            color: #333;
          }
          .password_input {
            display: flex;
            align-items: center;
          }
          .password_input input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .eye_icon {
            margin-left: -30px;
            cursor: pointer;
            color: #888;
          }
          .save_change_btn_wrapper {
            text-align: center;
          }
          .save_change_btn_wrapper .btn {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .save_change_btn_wrapper .btn:disabled {
            background-color: #dcdcdc;
            cursor: not-allowed;
          }
          .save_change_btn_wrapper .btn:hover:not(:disabled) {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default UpdatePassword;