import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuthDispatch } from "../context/authContext";
import axios from "axios";
import useAxiosInstance from "../instance/axiosInstance";

export default function Login() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const dispatch = useAuthDispatch();

  const [userData, setUserData] = useState({
    emailAddress: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("users/login", userData);
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

  return (
    <div className="container">
      <h2 className="title">Sign in to TravelSpend!</h2>
      <div className="">
        <p className="info-text">
          Do not have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
      <div className="form-container bg-light">
        <h6>Your Account Details</h6>
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="form-elements-div">
            <div className="input-email">
              <input
                className="form-control"
                placeholder="Email Address"
                name="emailAddress"
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-password">
              <input
                className="form-control"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Sign In
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}
