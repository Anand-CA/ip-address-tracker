import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../Marker";

const Map = ({ coordinates }) => {
  return (
    <div
      style={{
        height: "calc(100vh - 289px)",
        position: "relative",
        width: "100%",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API }}
        defaultCenter={coordinates}
        defaultZoom={11}
        center={coordinates}
      >
        <Marker
          lat={coordinates.lat}
          lng={coordinates.lng}
          text="My Marker"
          color="red"
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
