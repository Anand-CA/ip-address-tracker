import { useState } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Map from "./components/Map";

function App() {
	const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

	return (
		<>
			<Banner coordinates={coordinates} setCoordinates={setCoordinates} />
			<Map coordinates={coordinates} />
		</>
	);
}

export default App;
