import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import NavMenu from "../components/navigation/NavMenu";
import TourCard from "../components/tour/TourCard";

const TourView = () => {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    const tagId = localStorage.getItem("tagId");
    if (tagId) {
      setTag(tagId);
    }
  }, []);

  console.log(tag);

  if (!tag) {
    return <p>Loading stop details...</p>;
  }

  return (
    <div className="universityBio">
      {/* <h1>Tour View</h1> */}
      <TourCard tag={tag} />
    </div>
  );
};

export default TourView;
