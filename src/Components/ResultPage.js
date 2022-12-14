import React from "react";
import { CloudSun } from "phosphor-react";
import ForecastFuture from "./ForecastFuture";
function ResultPage({ apiData, city }) {
  return (
    <div className="flex flex-col items-center border-4 border-zinc-600 rounded-2xl md:p-4 py-5 mt-10 md:w-5/12 w-11/12 backdrop-blur-3xl bg-cyan-200 bg-opacity-20	">
      <div className="text-center text-neutral-900 font-mono font-semibold text-xl">
        {`${city} ,${apiData.city.country}`}
      </div>
      <div className="flex justify-between w-full items-center text-center  text-zinc-800 font-mono font-semibold  md:px-6  py-4">
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${apiData.list[0].weather[0].icon}@2x.png`}
            alt=""
            className=""
          />
          <p>
            {apiData.list[0].weather[0].description[0].charAt(0).toUpperCase() +
              apiData.list[0].weather[0].description.slice(1)}
          </p>
        </div>
        <p className="md:p-3 p-2 md:text-3xl text-xl">
          {apiData.list[0].main.feels_like} °C
        </p>
        <ul className="pl-4">
          <li className="text-left">Wind: {apiData.list[0].wind.speed} kmph</li>
          <li className="text-left">
            Humidity: {apiData.list[0].main.humidity} %
          </li>
          <li className="text-left">
            Pressure: {apiData.list[0].main.pressure} mb
          </li>
        </ul>
      </div>
      <div className=" text-neutral-900 font-mono font-semibold flex justify-between w-full items-center text-center pt-5 pb-4">
        <ForecastFuture apiData={apiData.list[0]} />
        <ForecastFuture apiData={apiData.list[8]} />
        <ForecastFuture apiData={apiData.list[16]} />
        <ForecastFuture apiData={apiData.list[24]} />
      </div>
    </div>
  );
}

export default ResultPage;
