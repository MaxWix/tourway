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

import Header from "../components/navigation/Header";
import blueBG from "../assets/imgs/DrexelBlue.svg";
import Button from "../components/common/Button";
import CircleButton from "../components/common/CircleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faXmark } from "@fortawesome/free-solid-svg-icons";
import VoiceoverIcon from "../assets/icons/voiceover.svg"


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

  const viewNextStop = () => {
    // First, close the card to return to map view
    closeCard();
    
    // Then, go to the next stop
    goToNextStop();
  };

  if (!matchedStops || matchedStops.length < 2) {
    return <p>Loading stop details...</p>;
  }

  const currentStop = matchedStops[currentStopIndex + 1];

  console.log(currentStop);

  return (
    <APIProvider apiKey={apiUrl}>
      <div className="tourView">
        {isMapView ? (
          <>
            <Header HeaderIMG={blueBG} height="156px" swoopTop="83px" />
            <Directions
              matchedStops={matchedStops}
              currentStopIndex={currentStopIndex}
              currentStop={currentStop}
            />
            <div style={{ height: "60vh" }}>
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
            <button onClick={goToNextStop}>Next Stop</button>
            <button onClick={() => openCard(currentStop.tag)}>View Stop</button>
          </>
        ) : (
          <TourCard tag={tagId} closeCard={closeCard} viewNextStop={viewNextStop} />
        )}
      </div>
    </APIProvider>
  );
};

// Directions component to handle map directions and contains directions text
function Directions({ matchedStops, currentStopIndex, currentStop }) {
  const map = useMap();
  const isApiLoaded = useApiIsLoaded();
  const [directions, setDirections] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [steps, setSteps] = useState([]);
  const [nextStepIndex, setNextStepIndex] = useState(0);
  const [currentInstruction, setCurrentInstruction] = useState("");

  // Request Directions from Google Maps API
  useEffect(() => {
    if (
      !map ||
      !isApiLoaded ||
      !matchedStops ||
      currentStopIndex === null ||
      matchedStops.length < 2
    )
      return;

    const directionsService = new window.google.maps.DirectionsService();

    const origin = matchedStops[currentStopIndex].Coordinates;
    const destination =
      currentStopIndex < matchedStops.length - 1
        ? matchedStops[currentStopIndex + 1].Coordinates
        : null;

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
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  }, [map, isApiLoaded, matchedStops, currentStopIndex]);

  // Create & Attach Directions Renderer to Map
  useEffect(() => {
    if (!map || !isApiLoaded || !window.google || !directions) return;

    const renderer = new window.google.maps.DirectionsRenderer({
      map: map,
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
      }
    }
  }, [directions]);

  return (
    <div className="directions">
      {directions && (
        <div>
          <div className="mainContent mainContentChooseTour tourCardContent">

        <div className="cardtop">
      <Header HeaderIMG={blueBG} height="90px" swoopTop="53px" />
      <div className="backButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faArrowLeftLong} />}
          bgColor="#DFF3F4"
          iconColor="#07294d"
          // onClick={() => closeCard()}
        />
      </div>
      <div className="voiceoverButton">
        <CircleButton
          icon={<img src={VoiceoverIcon} alt="Voiceover Icon" />}
          bgColor="#DFF3F4"
          iconColor="#07294d"
          // onClick={() => navigate("#")}
        />
      </div>
      <div className="exitButton">
        <CircleButton
          icon={<FontAwesomeIcon icon={faXmark} />}
          bgColor="#ffc600"
          iconColor="#07294d"
          // onClick={() => navigate("#")}
        />
      </div>
      </div>
          {/* Display current stop title as h1 */}
          <h1>{currentStop ? currentStop.title : "Next Stop"}</h1>
          <h3>Next Direction</h3>
          <p dangerouslySetInnerHTML={{ __html: currentInstruction }}></p>
          <p>
            Arrive by: {steps[nextStepIndex]?.arrivalTime || "Calculating..."}
          </p>
        </div>
      
        </div>
      )}
    </div>
  );
}

export default TourView;
