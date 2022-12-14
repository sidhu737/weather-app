import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Search from "./Components/Search";
import ResultPage from "./Components/ResultPage";
import axios from "axios";
function App() {
  const [city, setCity] = useState("Chintal");

  const [apiData, setApiData] = useState("");
  const [latlon, setLatlon] = useState({ lat: 17.5082583, lng: 78.4638163 });

  const getlanlon = (e) => {
    setLatlon(e);
  };
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition((e) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${e.coords.latitude}&lon=${e.coords.longitude}&appid=c985e0b5296242f953866e1ad9509f28`
        )
        .then(
          (res) => {
            setApiData(res.data);
            setCity(res.data.city.name);
          },
          (err) => console.log(err)
        );
      console.log(apiData, city);
    });
    // navigator.geolocation.getCurrentPosition((e) => {
    //   setLatlon({ lat: e.coords.latitude, lng: e.coords.longitude });
    // });
  };

  const getCityName = (e) => {
    setCity(e);
    console.log(city);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latlon.lat}&lon=${latlon.lng}&cnt=25&units=metric&appid=c985e0b5296242f953866e1ad9509f28`
      )
      .then(
        (res) => {
          setApiData(res.data);
        },
        (err) => console.log(err)
      );
  }, [latlon]);
  console.log(apiData);
  return (
    <div className="App flex flex-col justify-center font-mono font-semibold items-center">
      <h1 className="font-semibold text-zinc-700 md:text-4xl text-3xl mt-10 underline">
        Weather Forecast app
      </h1>
      <Search
        getPosition={getPosition}
        getCityName={getCityName}
        getlatlon={getlanlon}
      />
      {apiData ? <ResultPage apiData={apiData} city={city} /> : " "}
    </div>
  );
}

export default App;
