import React, { useEffect, useState } from "react";
import NavMenu from "../components/navigation/NavMenu";
import { supabase } from "../supabaseClient";

const TourOverview = () => {
  const [formData, setFormData] = useState(null);
  const [matchedStops, setMatchedStops] = useState([]);

  useEffect(() => {
    // Check if form data is stored in localStorage
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      // Parse the stored data and set it to state
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    if (formData) {
      // Use formData to perform your query or other logic
      console.log("Querying with form data:", formData);
    }
  }, [formData]);

  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchStops = async () => {
      const { data, error } = await supabase.from("stops").select("*");
      if (error) {
        console.error("error fetching stops:", error);
      } else {
        setStops(data);
        console.log(data);
      }
    };

    fetchStops();
  }, []);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      // Match tags from form data with stops
      const matched = [];

      // Iterate over each key in formData
      Object.values(formData).forEach((tags) => {
        tags.forEach((tag) => {
          // Find the matching stop for each tag
          const matchedStop = stops.find((stop) => stop.tag === tag);
          if (matchedStop) {
            matched.push(matchedStop);
          }
        });
      });

      setMatchedStops(matched); // Set the matched stops to state
    }
  }, [formData, stops]);

  console.log("TourOverview");
  return (
    <div className="TourOverview">
      <h1>Tour Overview</h1>
      <NavMenu />
      <div>
        {matchedStops.length > 0 ? (
          matchedStops.map((stop) => (
            <div key={stop.tagId}>
              <h3>{stop.title}</h3>
              <p>{stop.subtitle}</p>
              <p>{stop.Coordinates}</p>
            </div>
          ))
        ) : (
          <p>No matching stops found based on your selections.</p>
        )}
      </div>
    </div>
  );
};

export default TourOverview;
