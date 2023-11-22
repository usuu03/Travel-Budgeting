import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Component Imports
import Header from "./components/Header";

//Page Imports
import DestinationList from "./pages/DestinationList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExampleComponent from "./pages/ExampleComponent";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {""}
          {[
            <Route key="login" path="/" element={<Login />} />,
            <Route key="loginAlt" path="/login" element={<Login />} />,
          ]}
          <Route path="/test" element={<ExampleComponent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/destinations" element={<DestinationList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
