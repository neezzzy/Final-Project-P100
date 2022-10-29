import React from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import Authorize from "./pages/Authorize";
// import Profiler from "./pages/Profiler";

import "./App.css";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/authorize" element={<Authorize />} />
        {/* <Route path="/profiler" element={<Profiler />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
