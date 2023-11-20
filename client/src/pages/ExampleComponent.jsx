// Example Component
import React from "react";
import { useAuthState } from "../context/authContext";

const ExampleComponent = () => {
  const { isAuthenticated, user } = useAuthState();

  if (isAuthenticated) {
    return (
      <div>
        <p>Welcome, {user.firstname}!</p>
        {/* Render content for logged-in users */}
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in.</p>
        {/* Render content for non-logged-in users */}
      </div>
    );
  }
};

export default ExampleComponent;
