import React from "react";
import { Link } from "react-router-dom";
import NavMenu from "../components/navigation";

const Home = () => {
  console.log("Home");
  return (
    <div className="TourReview">
      <h1>Home</h1>
      <NavMenu />
    </div>
  );
};

export default Home;
