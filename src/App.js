import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";

function App() {
  //Write JS here
  // const API_Key = "7b3b2d5f9d5c4a7f1c81f387dac726f4";
  const API_Key = process.env.REACT_APP_WEATHER_KEY;


  // Example of UseState
  const [timezone, setTimeZone] = useState("");
  const [oDailyForcast, oSetDailyForcast] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [day, setDay] = useState("");

  //UseEffects
  useEffect(() => {
    getGeoLocal();
  }, []);

  //Functions
  const getGeoLocal = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const showPosition = async (position) => {
    console.log(position);
    const defaultLon = position.coords.longitude;
    const defaultLat = position.coords.latitude;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${defaultLat}&lon=${defaultLon}&
      exclude=hourly,minutely&units=imperial&appid=${API_Key}`
    );
    const data = await response.json();

    oSetDailyForcast(data.daily);
    setTimeZone(data.timezone);
    getDay();
  };

  const getWeather = async () => {
    const geoResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_Key}`
    );
    const geoData = await geoResponse.json();

    if (geoData.coord) {
      let searchLon = geoData.coord.lon;
      let searchLat = geoData.coord.lat;

      const searchResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${searchLat}&lon=${searchLon}&
          exclude=hourly,minutely&units=imperial&appid=${API_Key}`
      );
      const searchData = await searchResponse.json();

      oSetDailyForcast(searchData.daily);
      setTimeZone(searchData.timezone);
      getDay();
    }
  };

  const updateSearch = (oEvent) => {
    setSearch(oEvent.target.value);
    getWeather();
  };

  const getSearch = (oEvent) => {
    oEvent.preventDefault();
    setQuery(search);
    getWeather();
  };

  const getDay = (oEvent) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setDay(days);
  };

  //Return JSX
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          placeholder="City Name"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-btn" type="submit">
          <strong>Get Weather</strong>
        </button>
      </form>
      <Header location={query} city={timezone} />
      <div className="CardHolder">
        {oDailyForcast.map((forcast) => (
          <Card
            key={new Date(forcast.dt * 1000).getUTCDate()}
            day={day[new Date(forcast.dt * 1000).getDay()]}
            month={new Date(forcast.dt * 1000).getUTCMonth()}
            date={new Date(forcast.dt * 1000).getUTCDate()}
            year={new Date(forcast.dt * 1000).getUTCFullYear()}
            description={forcast.weather[0].description}
            icon={forcast.weather[0].icon}
            tempHigh={forcast.temp.max}
            tempLow={forcast.temp.min}
            humidity={forcast.humidity}
            windspeed={forcast.wind_speed}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
