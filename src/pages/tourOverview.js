import { React, useEffect, useState } from "react";
import NavMenu from "../components/navigation/NavMenu";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import CustomTourName from "../components/tour/CustomTourName";
import Button from "../components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/navigation/Header";
import mapPlaceholder from "../assets/imgs/map-placeholder.png";
import CircleButton from "../components/common/CircleButton";
import TourTimeandStops from "../components/tour/TourTimeandStops";
import DrexelLogo from "../assets/imgs/drexel-logo.png";
import sendIcon from "../assets/icons/send.svg";
import TourList from "../components/tour/TourList";
import TourEditModal from "../components/modals/TourEditModal";

const TourOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState(null);
  const [matchedStops, setMatchedStops] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [stopCount, setStopCount] = useState(0);
  const [editMode, setEditMode] = useState(false); // Edit mode state

  const navigate = useNavigate();

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    if (formData) {
      console.log("Querying with form data:", formData);
    }
  }, [formData]);

  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchStops = async () => {
      const { data, error } = await supabase.from("stops").select("*");
      if (error) {
        console.error("Error fetching stops:", error);
      } else {
        setStops(data);
      }
    };

    fetchStops();
  }, []);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const matched = [];

      Object.values(formData).forEach((tags) => {
        tags.forEach((tag) => {
          const matchedStop = stops.find((stop) => stop.tag === tag);
          if (matchedStop) {
            matched.push(matchedStop);
          }
        });
      });

      setMatchedStops(matched);
      const totalMinutes = matched.reduce(
        (total, stop) => total + parseInt(stop.duration || 0),
        0
      );
      setTotalDuration(totalMinutes);
      setStopCount(matched.length);
    }
  }, [formData, stops]);

  const handleStopClick = (stopId) => {
    localStorage.setItem("tagId", stopId);
    localStorage.setItem("matchedStops", JSON.stringify(matchedStops));
    navigate("/tour");
  };

  const handleDeleteClick = (stopId) => {
    setMatchedStops(matchedStops.filter((stop) => stop.tagId !== stopId));
  };

  const handleEditClick = () => {
    setEditMode((prevEditMode) => !prevEditMode); // Toggle edit mode
  };

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
      <div className="mainContent">
        <div className="universityTourOv">
          <div>
            <img src={DrexelLogo} />
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
        <TourTimeandStops
          totalDuration={totalDuration}
          stopCount={stopCount}
          onEditClick={handleEditClick} // Toggle edit mode
        />
        <TourList
          matchedStops={matchedStops}
          handleStopClick={handleStopClick}
          editMode={editMode}
          onDeleteClick={handleDeleteClick}
          hasEditMode
        />
        <div className="CTAsingle">
          <Button
            text="START TOUR"
            icon={<FontAwesomeIcon icon={faArrowRightLong} />}
            bgColor="#07294d"
            borderColor="#07294d"
            onClick={handleStopClick}
          />
        </div>
        {/* Add Stop Button */}
        {editMode && (
          <Button
            text="Add Stop"
            icon={<FontAwesomeIcon icon={faXmark} />}
            bgColor="#07294d"
            borderColor="#07294d"
            onClick={() => setIsModalOpen(true)} // Open tour edit modal
          />
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TourEditModal
          onClose={() => setIsModalOpen(false)}
          matchedStops={matchedStops}
        />
      )}
    </div>
  );
};

export default TourOverview;
