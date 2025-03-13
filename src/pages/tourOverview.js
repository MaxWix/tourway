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
import addStopsIcon from "../assets/icons/add_stops.svg";
import CircleButton from "../components/common/CircleButton";
import TourTimeandStops from "../components/tour/TourTimeandStops";
import DrexelLogo from "../assets/imgs/drexel-logo.png";
import sendIcon from "../assets/icons/share.svg";
import TourList from "../components/tour/TourList";
import TourEditModal from "../components/modals/TourEditModal";
import ShareModal from "../components/modals/ShareModal";

const TourOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState(null);
  const [matchedStops, setMatchedStops] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [stopCount, setStopCount] = useState(0);
  const [editMode, setEditMode] = useState(false); // Edit mode state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareModalOpenAndBegin, setIsShareModalOpenAndBegin] =
    useState(false);
  const [stops, setStops] = useState([]);

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
    if (formData && Object.keys(formData).length > 0 && stops.length > 0) {
      // Will hold unique stops by their tag
      const uniqueStopsByTag = new Map();

      Object.values(formData).forEach((tags) => {
        tags.forEach((tag) => {
          // Try to extract school prefix (for major-based matching)
          const schoolPrefix = tag.match(/^[A-Z]+/)?.[0];

          if (schoolPrefix && /^[A-Z]+[a-z]+/.test(tag)) {
            // This is a major ID with school prefix pattern
            const matchedStop = stops.find((stop) => stop.tag === schoolPrefix);
            if (matchedStop) {
              uniqueStopsByTag.set(matchedStop.tagId, matchedStop);
            }
          } else {
            // This is a regular tag (non-major question) - use original matching
            const matchedStop = stops.find((stop) => stop.tag === tag);
            if (matchedStop) {
              uniqueStopsByTag.set(matchedStop.tagId, matchedStop);
            }
          }
        });
      });

      // Convert to array for display
      const matched = Array.from(uniqueStopsByTag.values());
      setMatchedStops(matched);
    } else {
      setMatchedStops([]);
    }
  }, [formData, stops]);

  useEffect(() => {
    if (matchedStops.length > 0) {
      const totalMinutes = matchedStops.reduce(
        (total, stop) => total + parseInt(stop.duration || 0),
        0
      );
      setTotalDuration(totalMinutes);
      setStopCount(matchedStops.length);
    } else {
      setTotalDuration(0);
      setStopCount(0);
    }
  }, [matchedStops]); // Only re-run when matchedStops changes

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

  const handleModalClose = () => {
    setIsModalOpen(false);

    // Reload formData from localStorage
    const updatedFormData = localStorage.getItem("formData");
    if (updatedFormData) {
      setFormData(JSON.parse(updatedFormData));
    }
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setIsShareModalOpenAndBegin(false);
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
            onClick={() => setIsShareModalOpen(true)}
          />
        </div>
        <TourTimeandStops
          totalDuration={totalDuration}
          stopCount={stopCount}
          onEditClick={handleEditClick} // Toggle edit mode
          editMode={editMode}
        />
        <TourList
          matchedStops={matchedStops}
          handleStopClick={handleStopClick}
          editMode={editMode}
          onDeleteClick={handleDeleteClick}
          hasEditMode
          yellowCircles
        />
        <div className="CTAdouble">
          {/* Add Stop Button */}
          {editMode && (
            <Button
              text="ADD STOPS"
              icon={<img src={addStopsIcon} />}
              bgColor="#FFFFFF"
              borderColor="#07294d"
              textColor="#07294d"
              onClick={() => setIsModalOpen(true)} // Open tour edit modal
            />
          )}

          <Button
            text="START TOUR"
            icon={<FontAwesomeIcon icon={faArrowRightLong} />}
            bgColor="#07294d"
            borderColor="#07294d"
            onClick={setIsShareModalOpenAndBegin}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TourEditModal onClose={handleModalClose} matchedStops={matchedStops} />
      )}
      {isShareModalOpen && (
        <ShareModal closeShareModal={handleCloseShareModal} />
      )}
      {isShareModalOpenAndBegin && (
        <ShareModal
          closeShareModal={handleCloseShareModal}
          withBeginButton
          handleStopClick={handleStopClick}
        />
      )}
    </div>
  );
};

export default TourOverview;
