import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Notes from "./pages/notes";
import Profile from "./pages/profile";
import UniversityBio from "./pages/universityBio";
import Questionnare from "./pages/questionnare";
import TourOverview from "./pages/tourOverview";
import TourView from "./pages/tourView";
import TourReview from "./pages/tourReview";
import FAQ from "./pages/FAQ";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/university/:universityId" element={<UniversityBio />} />
          <Route path="/tour/questionnaire" element={<Questionnare />} />
          <Route path="/tour/overview" element={<TourOverview />} />
          <Route path="/tour" element={<TourView />} />
          <Route path="/tour/review" element={<TourReview />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
