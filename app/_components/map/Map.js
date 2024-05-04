import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { Search, MapPin } from "lucide-react";

export default function Map() {
  const [query, setQuery] = useState("");
  const [allMarkers, setAllMarkers] = useState([
    {
      lat: 52.520008,
      lng: 13.404954,
      label: "Berlin",
      address: "Berlin, Germany",
      index: "12587",
    },
    {
      lat: 52.4458238,
      lng: 13.6244508,
      label: "Spreetunnel Friedrichshagen",
      address: "Spreetunnel, 12587 Berlin",
      index: "12587",
    },
    {
      lat: 52.53566,
      lng: 13.2291925,
      label: "Aaliyah",
      address: "Exerzierstraße, 21, 13357 Berlin",
      index: "13357",
    },
    {
      lat: 52.4966583,
      lng: 13.291546,
      label: "Merita",
      address: "Johann-Sigismund-Straße, 16, 10369 Berlin",
      index: "12587",
    },
    {
      lat: 52.5233322,
      lng: 13.3827204,
      label: "Perfect Skin",
      address: "Reinhardt str., 15, 10117 Berlin",
      index: "10117",
    },
    {
      lat: 52.4458238,
      lng: 13.6244508,
      label: "Wimpern Traum",
      address: "Mariendorfer Damm, 45, 12109 Berlin",
      index: "12109",
    },
    {
      lat: 52.4487041,
      lng: 13.3828721,
      label: "Guti",
      address: "Ernststraße, 64, 13509 Berlin",
      index: "13509",
    },
    {
      lat: 52.4448419,
      lng: 13.5747239,
      label: "Herzklopfen",
      address: "Kietzer Straße, 13, 12555 Berlin",
      index: "12555",
    },
    {
      lat: 52.5167983,
      lng: 13.3034053,
      label: "My Time",
      address: "Behaimstraße, 4, 10585 Berlin",
      index: "10585",
    },
  ]);
  const [markers, setMarkers] = useState(allMarkers);
  const [center, setCenter] = useState([52.520008, 13.404954]); // Начальный центр карты - Берлин

  useEffect(() => {
    if (query === "") {
      setMarkers(allMarkers);
      setCenter([52.520008, 13.404954]);
    } else {
      searchPlaces();
    }
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const searchPlaces = async () => {
    const filteredMarkers = allMarkers.filter(
      (marker) =>
        marker.index === query ||
        marker.label.toLowerCase().includes(query.toLowerCase()) ||
        marker.address.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredMarkers.length > 0) {
      const newCenter = [filteredMarkers[0].lat, filteredMarkers[0].lng];
      setCenter(newCenter);
      setMarkers(filteredMarkers);
    } else {
      setMarkers([]);
      setCenter([52.520008, 13.404954]);
    }
  };

  const addSearchControlToMap = (map) => {
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      autoClose: true,
      searchLabel: "Post codes or salon",
      keepResult: true,
      showMarker: false,
    });
    map.addControl(searchControl);
  };

  return (
    <div
      style={{
        width: "900px",
        height: "600px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        style={{ padding: "10px" }}
        className="flex flex-grow items-center mr-2 rounded-lg overflow-hidden"
      >
        <Search size={20} className="m-2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Post codes oder salon"
          style={{
            width: "100%",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <MapPin size={20} className="ml-3 text-gray-400" />
      </div>

      <MapContainer
        center={center} 
        zoom={10}
        style={{  width: "900px",
        height: "600px", borderRadius: "10px" }}
        whenCreated={addSearchControlToMap}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Отображаем маркеры на карте */}
        {markers.map((marker, index) => (
          <CircleMarker
            key={index}
            center={[marker.lat, marker.lng]}
            radius={10}
            color="transparent"
            fillColor="green"
            opacity={0.5}
          >
            <Popup>
              <h2>{marker.label}</h2>
              <p>{marker.address}</p>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
