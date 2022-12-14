import React from "react";

function ForecastFuture({ apiData }) {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const val = new Date(apiData.dt_txt).getDay();
  return (
    <div className="flex flex-col items-center md:p-2 p-1">
      <p className="md:text-base text-sm">{dayNames[val]}</p>
      <img
        src={`http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`}
        alt=""
        className="w-14 h-14"
      />
      <p className="text-center md:text-sm text-xs md:p-1 h-8">
        {apiData.weather[0].description}
      </p>
      <p className="text-center text-sm">
        {parseFloat(apiData.main.feels_like).toFixed(1)} °c
      </p>
    </div>
  );
}

export default ForecastFuture;
