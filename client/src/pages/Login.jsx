import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    emailAddress: "",
    password: "",
  });

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
        <form action="" className="">
          <div className="form-elements-div">
            <div className="input-email">
              <input
                className="form-control"
                placeholder="Email Address"
                name="emailAddress"
                type="text"
              />
            </div>
            <div className="input-password">
              <input
                className="form-control"
                placeholder="Password"
                name="password"
                type="password"
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
