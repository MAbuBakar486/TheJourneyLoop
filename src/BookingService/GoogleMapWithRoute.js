// GoogleMapWithRoute.js
import React, { useEffect, useRef } from 'react';

const GoogleMapWithRoute = ({ origin, destination }) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const directionsRenderer = useRef(null);

  useEffect(() => {
    if (!window.google || !origin || !destination) return;

    if (!map.current) {
      map.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 31.5204, lng: 74.3587 }, // Default center
        zoom: 13,
      });

      directionsRenderer.current = new window.google.maps.DirectionsRenderer();
      directionsRenderer.current.setMap(map.current);
    }

    const directionsService = new window.google.maps.DirectionsService();

    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.current.setDirections(result);
      } else {
        alert('Directions request failed due to ' + status);
      }
    });
  }, [origin, destination]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default GoogleMapWithRoute;