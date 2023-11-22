import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import useAxiosInstance from "../instance/axiosInstance";
import { useAuthState } from "../context/authContext";

export default function DestinationList() {
  const [destinations, setDestinations] = useState([]);

  const { isAuthenticated, user } = useAuthState();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axiosInstance.get("destinations/user/all");
        setDestinations(response.data); // Assuming the response contains the user's destinations
        console.log(user.firstName);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, [axiosInstance]);

  useEffect(() => {
    // Check authentication status when the component mounts
    if (!isAuthenticated) {
      // Redirect if not logged in
      alert("Please Log In to see your destinations");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    // Return null or a loading spinner, etc.
    return null;
  }

  return (
    <div>
      {isAuthenticated ? (
        <h2 className="page-title">{`Welcome back to your Travel Destinations, ${user.firstName}!`}</h2>
      ) : (
        <h2>Loading...</h2>
      )}

      <div className="container">
        <div className="destination-grid">
          {destinations.map((destination) => (
            <div key={destination.id} className="destination-box">
              {/* Render destination details here */}
              <div>
                <Link>{destination.name}</Link>
              </div>
              <div>{destination.description}</div>

              <div className="btn-section">
                <button className=" btn btn-warning" id="edit-btn">
                  Edit{" "}
                </button>
                <button className=" btn btn-danger" id="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
