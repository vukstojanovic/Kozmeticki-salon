import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./SimpleMap.scss";
import L from "leaflet";

const SimpleMap: React.FC = () => {
  const position: [number, number] = [43.3084341116696, 21.926535836279882];

  const customIcon = L.icon({
    iconUrl: require("leaflet-color-markers/img/marker-icon-red.png"),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={position}
      zoom={16}
      className="custom-map-container"
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SimpleMap;
