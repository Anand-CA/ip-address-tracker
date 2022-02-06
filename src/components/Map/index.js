import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function Map({ coordinates }) {
	function LocationMarker() {
		const map = useMap();
		map.flyTo(coordinates, map.getZoom());

		return (
			<Marker position={coordinates}>
				<Popup>You are here</Popup>
			</Marker>
		);
	}

	return (
		<MapContainer
			style={{
				height: "calc(100vh - 287px)",
				width: "100%",
				zIndex: 1
			}}
			center={coordinates}
			zoom={13}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker />
		</MapContainer>
	);
}

export default Map;
