import React, { useState } from "react";
import "./location.css";

const locations = [
  "Northern Region",
  "Eastern Region",
  "Western Region",
  "South Western Region",
  "West Nile",
  "Central Region",
];

export default function Location(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  const filterLocations = (query) => {
    const filtered = locations.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterLocations(e.target.value);
    props.onLocationChange(e.target.value);
  };

  return (
    <>
      <div className="center location">
        <input
          className="location_input"
          type="text"
          placeholder="Search locations"
          value={searchQuery}
          onChange={handleInputChange}
          list="location-list"
        />
        <datalist id="location-list">
          {locations.map((location, index) => (
            <option key={index} value={location} />
          ))}
        </datalist>
      </div>
      {filteredLocations.length === 0 && (
        <div className="center">
          <div className="nolocation">No matching locations found.</div>
        </div>
      )}
    </>
  );
}
