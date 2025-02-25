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

// Main TourView component
const TourView = () => {
  const [matchedStops, setMatchedStops] = useState(null);
  const [isMapView, setIsMapView] = useState(true);
  const [tagId, setTagId] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 39.9568884249308,
    lng: -75.19000576731226,
  });
  const [userLocation, setUserLocation] = useState(null);
  const [geolocationError, setGeolocationError] = useState(null);
  const [currentStopIndex, setCurrentStopIndex] = useState(0); // Track the current stop

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

  const apiUrl = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID;

  const openCard = (stop) => {
    setTagId(stop.tag);
    setIsMapView(false);
  };

  const closeCard = () => {
    setIsMapView(true);
  };

  // Get user's current location as origin
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          setGeolocationError(error.message);
          console.error("Error getting user location:", error);
        }
      );
    } else {
      setGeolocationError("Geolocation is not supported by this browser.");
    }
  };

  const goToNextStop = () => {
    if (matchedStops && currentStopIndex < matchedStops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1); // Move to the next stop
    }
  };

  if (!matchedStops || matchedStops.length < 2) {
    return <p>Loading stop details...</p>;
  }

  return (
    <APIProvider apiKey={apiUrl}>
      <div className="tourView">
        {isMapView ? (
          <>
            <Header HeaderIMG={blueBG} height="156px" swoopTop="83px" />
            <Directions
              matchedStops={matchedStops}
              userLocation={userLocation}
              currentStopIndex={currentStopIndex}
            />
            <div style={{ height: "80vh" }}>
              <Map
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
                      onClick={() => openCard(stop)}
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

            {/* Button to trigger geolocation */}
            <button onClick={getUserLocation}>Get My Location</button>
            {geolocationError && <p>{geolocationError}</p>}

            {/* Button to go to the next stop */}
            <button onClick={goToNextStop}>Next Stop</button>
          </>
        ) : (
          <TourCard tag={tagId} closeCard={closeCard} />
        )}
      </div>
    </APIProvider>
  );
};

// Directions component to handle map operations
function Directions({ matchedStops, userLocation, currentStopIndex }) {
  const map = useMap();
  const isApiLoaded = useApiIsLoaded();
  const [directions, setDirections] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // Request Directions from Google Maps API
  useEffect(() => {
    if (
      !map ||
      !isApiLoaded ||
      !userLocation ||
      !matchedStops ||
      currentStopIndex === null
    )
      return;

    const directionsService = new window.google.maps.DirectionsService();

    const origin =
      currentStopIndex === 0
        ? userLocation
        : matchedStops[currentStopIndex - 1].Coordinates;
    const destination = matchedStops[currentStopIndex].Coordinates;

    directionsService.route(
      {
        origin, // If it's the first stop, use the user's location as the origin
        destination, // Destination is the current stop
        waypoints:
          currentStopIndex > 0
            ? [
                {
                  location: matchedStops[currentStopIndex].Coordinates,
                  stopover: true,
                },
              ]
            : [],
        optimizeWaypoints: false, // We are just calculating between two points
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
  }, [map, isApiLoaded, userLocation, matchedStops, currentStopIndex]);

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
  const route = directions?.routes[0];
  const leg = route?.legs[0];
  const routeSummary = route?.summary;
  const startAddress = leg?.start_address;
  const endAddress = leg?.end_address;
  const distance = leg?.distance?.text;
  const duration = leg?.duration?.text;

  return (
    <div className="directions">
      {route && (
        <div>
          <h2>Route Summary: {routeSummary}</h2>
          <p>
            {startAddress} to {endAddress}
          </p>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>

          <h3>Alternative Routes</h3>
          <ul>
            {directions.routes.map((route, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    directionsRenderer.setRouteIndex(index);
                    setDirectionsRenderer(directionsRenderer);
                  }}
                >
                  {route.summary}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TourView;
