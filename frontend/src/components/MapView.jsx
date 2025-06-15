import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapView() {
  const [locations, setLocations] = useState([]) // will contain the coorindate numbers

  useEffect(() => {
    fetch('')
    .then(res => res.json())
    .then(setLocations)
    .catch(err => console.error('error, did not fetch', err));
  }, []);
}