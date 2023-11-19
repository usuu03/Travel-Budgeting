import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
        <Link to="/discovery" className="navbar-brand" id="nav-item">
          Crowdfunding Platform
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item active">
              <Link to="/create-campaign" className="nav-link" id="nav-item">
                Create
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/destinations" className="nav-link" id="nav-item">
                My Destinations
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" id="nav-item">
                Login/Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
