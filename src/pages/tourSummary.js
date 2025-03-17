import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import Header from "../components/navigation/Header";
import CircleButton from "../components/common/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/common/Button";
import SummaryHeader from "../assets/tourway/summary-header.jpg";
import SummaryHeaderGraphic from "../assets/tourway/summary-header-graphic.png";
import VoiceoverIcon from "../assets/icons/voiceover.svg";
import SummaryNotesCard from "../components/notes/SummaryNotesCard";
import SummaryTourCard from "../components/tour/SummaryTourCard";
import TourCard from "../components/tour/TourCard";

const TourSummary = () => {
  const navigate = useNavigate();
  const [stops, setStops] = useState([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [tagId, setTagId] = useState(null);

  // Load stops from localStorage
  useEffect(() => {
    const stops = localStorage.getItem("matchedStops");
    if (stops) {
      try {
        setStops(JSON.parse(stops));
      } catch (error) {
        console.error("Error parsing matchedStops:", error);
      }
    }
  }, []);

  const openCard = (tag) => {
    setTagId(tag);
    setIsSummaryOpen(false);
  };

  const closeCard = () => {
    setIsSummaryOpen(true);
  };

  return (
    <>
      {isSummaryOpen ? (
        <div className="TourSummary">
          <Header HeaderIMG={SummaryHeader} height="200px" swoopTop="127px" />
          <div className="headerGraphic headerGraphicSummary">
            <img src={SummaryHeaderGraphic} />
          </div>
          <div className="headerTextSummary">
            <h4>Congratulations!</h4>
            <p>
              You've finished your tour at <b>Drexel University!</b>
            </p>
          </div>
          <div className="backButton">
            <CircleButton
              icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
              bgColor="#D0E4F6"
              iconColor="#07294d"
              onClick={() => navigate("/tour")}
            />
          </div>
          <div className="voiceoverButton">
            <CircleButton
              icon={<img src={VoiceoverIcon} alt="Voiceover Icon" />}
              bgColor="#D0E4F6"
              iconColor="#07294d"
              onClick={() => navigate("#")}
            />
          </div>
          <div className="exitButton">
            <CircleButton
              icon={<FontAwesomeIcon icon={faXmark} />}
              bgColor="#D0E4F6"
              iconColor="#07294d"
              onClick={() => navigate("#")}
            />
          </div>
          <div className="mainContent mainContentSummary">
            <h1>Tour Summary</h1>
            <SummaryNotesCard />
            <div className="tourSummary">
              <p>Click on a stop to view it again if you wish!</p>
              {stops.map((stop) => {
                return (
                  <SummaryTourCard
                    key={stop.tagId}
                    stop={stop}
                    tag={stop.tag}
                    openCard={openCard}
                  />
                );
              })}
            </div>
          </div>
          <div className="CTAsingle">
            <Button
              text="END TOUR"
              icon={<FontAwesomeIcon icon={faXmark} />}
              bgColor="#07294d"
              borderColor="#07294d"
              action="/tour/resources"
            />
          </div>
        </div>
      ) : (
        <TourCard tag={tagId} closeCard={closeCard} />
      )}
    </>
  );
};

export default TourSummary;
