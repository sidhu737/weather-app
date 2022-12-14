import React, { useState } from "react";
import axios from "axios";
import PlacesAutocomplete from "./PlacesAutocomplete";

function Search(props) {
  const handleChange = (e) => {
    e.preventDefault();
    // alert(`Entered name ${city}`);
  };

  return (
    <form onSubmit={handleChange} className="mt-10 flex flex-col  items-center">
      <PlacesAutocomplete
        getlatlon={props.getlatlon}
        getCityName={props.getCityName}
      />

      {/* <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        placeholder="City name goes here 🙂"
        className="p-2 px-3 w-64 rounded-2xl outline-none font-semibold font-mono"
      ></input> */}

      <span className="font-semibold "> or </span>
      <button
        className="inline-flex items-center my-2 justify-center px-4 py-2 text-base font-medium text-center text-zinc-800 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-indigo-100 bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
        onClick={props.getPosition}
      >
        Current location
      </button>
    </form>
  );
}

export default Search;
