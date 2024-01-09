import React, { useState } from "react";
import axios from "axios";
import "./weatherapp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "1a2675ae8d5c4e058e582110232909";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  const getWeather = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please check the city name.");
      setWeatherData(null);
      alert("Failed to fetch weather data");
    }
    setIsLoading(false);
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={getWeather}>search</button>
      </div>
      {isLoading && <p className="loading-msg">Loading data...</p>}
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h2>
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
