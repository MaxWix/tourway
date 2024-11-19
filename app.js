// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import UniversityBio from "./pages/universityBio";
import Questionnare from "./pages/questionnare";
import TourOverview from "./pages/tourOverview";
import TourView from "./pages/tourView";
import TourReview from "./pages/tourReview";
import FAQ from "./pages/FAQ";
// import NotesModal from "./components/NotesModal/NotesModal";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/university/:universityId" element={<UniversityBio />} />
        <Route path="/tour/questionnaire" element={<Questionnare />} />
        <Route path="/tour/overview" element={<TourOverview />} />
        <Route path="/tour" element={<TourView />} />
        <Route path="/tour/review" element={<TourReview />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      {/* <NotesModal /> */}
    </div>
  );
};

export default App;
