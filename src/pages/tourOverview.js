import { React, useEffect, useState } from "react";
import NavMenu from "../components/navigation/NavMenu";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CustomTourName from "../components/tour/CustomTourName";
import Button from "../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/navigation/Header";
import mapPlaceholder from "../assets/imgs/map-placeholder.png";
import CircleButton from "../components/common/CircleButton";
import TourTimeandStops from "../components/tour/TourTimeandStops";
import DrexelLogo from "../assets/imgs/drexel-logo.png"
import sendIcon from "../assets/icons/send.svg"


const TourOverview = () => {
  const [formData, setFormData] = useState(null);
  const [matchedStops, setMatchedStops] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [stopCount, setStopCount] = useState(0);

  const navigate = useNavigate();

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

      const totalMinutes = matched.reduce((total, stop) => total + parseInt(stop.duration || 0), 0);
      setTotalDuration(totalMinutes);
      setStopCount(matched.length);
    }
  }, [formData, stops]);

  const handleStopClick = (stopId) => {
    console.log(stopId);
    localStorage.setItem("tagId", stopId);
    localStorage.setItem("matchedStops", JSON.stringify(matchedStops));
    navigate("/tour");
  };

  console.log("TourOverview");
  return (
    <div className="TourOverview">
      <Header HeaderIMG={mapPlaceholder} height="220px" swoopTop="143px" />
      <div className="backButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
          bgColor="#07294D"
          iconColor="#D0E4F6"
          onClick={() => navigate("../university")}
        />
      </div>
      {/* <div className="exitButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faXmark} />}
          bgColor="#ffc600"
          iconColor="#07294d"
          onClick={() => navigate("#")}
        />
      </div> */}
      <div className="mainContent">
      {/* <CustomTourName /> */}
      <div className="universityTourOv">
            <div>
              <img src={DrexelLogo}/>
              <div>
                  <h4>Drexel University</h4>
                  <p>Custom Campus Tour</p>
              </div>
            </div>
            <CircleButton
              icon={<img src={sendIcon} />}
              bgColor="#D0E4F6"
              iconColor="#07294D"
              onClick={() => navigate("#")}
            />
        </div>
        <TourTimeandStops totalDuration={totalDuration} stopCount={stopCount} />
      <div className="StopsHolder">
        {matchedStops.length > 0 ? (
          matchedStops.map((stop, index) => (
            <div
              key={stop.tagId}
              id={stop.tag}
              onClick={() => handleStopClick(stop.tag)}
              style={{ cursor: "pointer" }}
            >
              <p>{index + 1}</p>
              <div>
                <div>
                  <h3>{stop.subtitle}</h3>
                  {/* <p>{stop.title}</p> */}
                  <div className="CatWraper">
                    {stop.categories.map((category, index) => (
                      <p key={index}>{category}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="duration">{stop.duration} mins</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No matching stops found based on your selections.</p>
        )}
        <div className="verticalLine">&nbsp;</div>
     
      </div>
      <div className="CTAsingle">
      <Button
          text="START TOUR"
          icon={<FontAwesomeIcon icon={faArrowRightLong} />}
          bgColor="#07294d"
          borderColor="#07294d"
          onClick={handleStopClick}
        />
        </div>
    </div>
    </div>
  );
};

export default TourOverview;
