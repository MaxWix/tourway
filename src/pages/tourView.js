"use client";

import React, { useState, useEffect } from "react";
import TourCard from "../components/tour/TourCard";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";

import TourList from "../components/tour/TourList";
import Header from "../components/navigation/Header";
import blueBG from "../assets/imgs/DrexelBlue.svg";
import Button from "../components/common/Button";
import CircleButton from "../components/common/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faXmark,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import VoiceoverIcon from "../assets/icons/voiceover.svg";
import sendIcon from "../assets/icons/share.svg";
import arrowup from "../assets/icons/arrowup.svg";
import DirectionArrow from "../components/navigation/DirectionArrow";
import TourTimeandStops from "../components/tour/TourTimeandStops";
import { useNavigate } from "react-router-dom";
import ShareModal from "../components/modals/ShareModal";

// Main TourView component
const TourView = () => {
  // Stops array
  const [matchedStops, setMatchedStops] = useState(null);
  const [isMapView, setIsMapView] = useState(true);
  const [tagId, setTagId] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 39.9568884249308,
    lng: -75.19000576731226,
  });
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [stopCount, setStopCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const apiUrl = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID;

  // Load stops from localStorage
  useEffect(() => {
    const stops = localStorage.getItem("matchedStops");
    if (stops) {
      try {
        setMatchedStops(JSON.parse(stops));
      } catch (error) {
        console.error("Error parsing matchedStops:", error);
      }
    }
  }, []);

  const openCard = (tag) => {
    setTagId(tag);
    setIsMapView(false);
  };

  const closeCard = () => {
    setIsMapView(true);
  };

  const goToNextStop = () => {
    if (matchedStops && currentStopIndex < matchedStops.length - 1) {
      setCurrentStopIndex((prev) => prev + 1); // Move to the next stop
    }
  };

  const goToPreviousStop = () => {
    if (matchedStops && currentStopIndex > 0) {
      setCurrentStopIndex((prev) => prev - 1); // Move to the previous stop
    }
  };

  const handleStopClick = (stopId) => {
    localStorage.setItem("tagId", stopId);
    localStorage.setItem("matchedStops", JSON.stringify(matchedStops));
    navigate("/tour");
  };

  const handleDeleteClick = (stopId) => {
    setMatchedStops(matchedStops.filter((stop) => stop.tagId !== stopId));
  };

  const viewNextStop = () => {
    // First, close the card to return to map view
    closeCard();

    // Then, go to the next stop
    goToNextStop();
  };

  const handleEditClick = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (matchedStops && matchedStops.length > 0) {
      // Calculate total duration from matched stops
      const totalMinutes = matchedStops.reduce(
        (total, stop) => total + parseInt(stop.duration || 0),
        0
      );
      setTotalDuration(totalMinutes);
      setStopCount(matchedStops.length);
    }
  }, [matchedStops]);

  if (!matchedStops || matchedStops.length < 2) {
    return <p>Loading stop details...</p>;
  }

  const currentStop = matchedStops[currentStopIndex];
  // Calculate the stop number for display (adding 1 because arrays are 0-indexed)
  const currentStopNumber = currentStopIndex + 1; //

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <APIProvider apiKey={apiUrl}>
      <div className="tourView">
        {isMapView ? (
          <>
            <div class="cardtop">
              <Header HeaderIMG={blueBG} height="148px" swoopTop="73px" />
              <div className="backButton">
                <CircleButton
                  icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
                  bgColor="#D0E4F6"
                  iconColor="#07294d"
                  // onClick={() => closeCard()}
                />
              </div>
              <div className="voiceoverButton">
                <CircleButton
                  icon={<img src={VoiceoverIcon} alt="Voiceover Icon" />}
                  bgColor="#D0E4F6"
                  iconColor="#07294d"
                  // onClick={() => navigate("#")}
                />
              </div>
              <div className="exitButton">
                <CircleButton
                  icon={<FontAwesomeIcon icon={faXmark} />}
                  bgColor="#D0E4F6"
                  iconColor="#07294d"
                  // onClick={() => navigate("#")}
                />
              </div>
            </div>

            <Directions
              matchedStops={matchedStops}
              currentStopIndex={currentStopIndex}
              currentStop={currentStop}
              currentStopNumber={currentStopNumber}
            />
            <div className="mapview">
              <Map
                disableDefaultUI
                defaultZoom={15}
                defaultCenter={mapCenter}
                mapId={mapId}
                fullscreenControl={false}
                options={{
                  draggable: true,
                  scrollwheel: true,
                  disableDoubleClickZoom: false,
                  gestureHandling: "auto",
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }],
                    },
                  ],
                }}
              >
                {/* Render Markers */}
                {matchedStops.map((stop) => {
                  const [lat, lng] = stop.Coordinates.split(", ").map(Number);
                  return (
                    <AdvancedMarker
                      key={stop.tagId}
                      position={{ lat, lng }}
                      onClick={() => openCard(stop.tag)}
                    >
                      <Pin
                        background={"#0BA3A8"}
                        borderColor={"#0BA3A8"}
                        glyphColor={"white"}
                      />
                    </AdvancedMarker>
                  );
                })}
              </Map>
            </div>

            {/* Buttons for Navigation */}
            <button
              className="testingBtns"
              onClick={goToPreviousStop}
              disabled={currentStopIndex === 0}
            >
              Back
            </button>
            <button className="testingBtns" onClick={goToNextStop}>
              Next Stop
            </button>
            <button
              className="testingBtns"
              onClick={() => openCard(currentStop.tag)}
            >
              View Stop
            </button>
            <div className="onScroll">
              <div className="CTA">
                <Button
                  text="VIEW STOP"
                  icon={<FontAwesomeIcon icon={faArrowRightLong} />}
                  bgColor="#FFD74D"
                  borderColor="#FFD74D"
                  textColor="#000000"
                  iconColor="#000000"
                  onClick={() => openCard(currentStop.tag)}
                />
              </div>
              <div className="onmap">
                <span>
                  <img src={arrowup} alt="arrow up"></img>
                </span>
                <div className="NameShare">
                  <h3> Drexel University </h3>
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
                />
              </div>
            </div>
            {isShareModalOpen && (
              <ShareModal closeShareModal={handleCloseShareModal} />
            )}
          </>
        ) : (
          <TourCard
            tag={tagId}
            closeCard={closeCard}
            viewNextStop={viewNextStop}
            currentStopNumber={currentStopNumber}
          />
        )}
      </div>
    </APIProvider>
  );
};

function Directions({ matchedStops, currentStopIndex, currentStopNumber }) {
  const map = useMap();
  const isApiLoaded = useApiIsLoaded();
  const [directions, setDirections] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [steps, setSteps] = useState([]);
  const [nextStepIndex, setNextStepIndex] = useState(0);
  const [currentInstruction, setCurrentInstruction] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // Watch user's live location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting live location", error),
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
    }
  }, []);

  // Request Directions from Google Maps API
  useEffect(() => {
    if (
      !map ||
      !isApiLoaded ||
      !matchedStops ||
      currentStopIndex === null ||
      !userLocation
    )
      return;

    const directionsService = new window.google.maps.DirectionsService();

    const origin = userLocation; // Live location
    const destination = matchedStops[currentStopIndex]?.Coordinates;

    if (!destination) return;

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      }
    );
  }, [map, isApiLoaded, matchedStops, currentStopIndex, userLocation]); // Update when location or stop changes

  // Render directions on the map
  useEffect(() => {
    if (!map || !isApiLoaded || !window.google || !directions) return;

    const renderer = new window.google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: true, // Hides extra Google markers
    });

    renderer.setDirections(directions);
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [map, isApiLoaded, directions]);

  // Extract relevant directions information
  useEffect(() => {
    if (directions) {
      const leg = directions.routes[0]?.legs[0];
      if (leg) {
        let accumulatedTime = Date.now(); // Start from the current time

        const routeSteps = leg.steps.map((step) => {
          accumulatedTime += step.duration.value * 1000; // Add step duration in milliseconds

          return {
            instruction: step.instructions,
            location: step.start_location,
            arrivalTime: new Date(accumulatedTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setSteps(routeSteps);
        setCurrentInstruction(routeSteps[0]?.instruction || "Start Navigation");
        setNextStepIndex(0);
      }
    }
  }, [directions]);

  return (
    <div>
      <div className="mapMainContent">
        <div class="stopTitle">
          <div>
            <p>{currentStopNumber}</p>
          </div>
          <h1>{matchedStops[currentStopIndex]?.title || "Next Stop"}</h1>
        </div>

        {directions && steps.length > 0 ? (
          <div className="directions">
            <div class="compass">
              <DirectionArrow instruction={currentInstruction} />
              <p dangerouslySetInnerHTML={{ __html: currentInstruction }}></p>
            </div>
            <div>
              <p>
                Arriving at:{" "}
                {steps[nextStepIndex]?.arrivalTime || "Calculating..."}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading Directions...</p>
        )}
      </div>
    </div>
  );
}

export default TourView;
