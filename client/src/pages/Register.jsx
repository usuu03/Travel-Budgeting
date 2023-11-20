import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosInstance from "../instance/axiosInstance";
import { useAuthDispatch } from "../context/authContext";

export default function Register() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const dispatch = useAuthDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    confirmEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    emailMatch: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email addresses match
    if (userData.emailAddress !== userData.confirmEmail) {
      setErrors({
        ...errors,
        emailMatch: "Email addresses do not match",
        password: "", // Clear password error
      });
      return;
    }

    // Check if the password meets the criteria
    if (!isPasswordValid(userData.password)) {
      setErrors({
        ...errors,
        password:
          "Your password must have at least: 8 characters, 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number.",
        emailMatch: "", // Clear email match error
      });
      return;
    }

    try {
      const response = await axiosInstance.post("users/register", userData);
      console.log(response.data);
      dispatch({ type: "LOGIN", payload: response.data });
      navigate("/destinations");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="container">
      <h2 className="title">Create an Account</h2>

      <div className="info-container">
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>

      <div className="form-container bg-light">
        <h6>Your Account Details</h6>
        <form className="" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-firstName">
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-lastName">
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-emailAddress">
              <input
                className={`form-control ${
                  errors.emailMatch ? "input-error" : ""
                }`}
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-confirmEmailAddress">
              <input
                className={`form-control ${
                  errors.emailMatch ? "input-error" : ""
                }`}
                type="email"
                name="confirmEmail"
                placeholder="Confirm Email Address"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-password">
              <input
                className={`form-control ${
                  errors.password ? "input-error" : ""
                }`}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {errors.password && (
            <div className="form-row">
              <div className="password-explained">
                <p className="alert alert-danger" role="alert">
                  {errors.password}
                </p>
              </div>
            </div>
          )}

          {errors.emailMatch && (
            <div className="form-row">
              <div className="password-explained">
                <p className="alert alert-danger" role="alert">
                  {errors.emailMatch}
                </p>
              </div>
            </div>
          )}

          <div className="form-row">
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
