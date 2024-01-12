import React, { useState } from "react";
import "./weatherapp.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "1a2675ae8d5c4e058e582110232909";
  const apiUrl = "https://api.weatherapi.com/v1/current.json";

  const getWeather = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}?key=${apiKey}&q=${city}`);
      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", response.status, response.statusText);
        alert("Failed to fetch weather data. Please enter a valid city name.");
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>
      {loading && <p className="loading">Loading data...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <div className="info-box">
            <h2>Temperature</h2>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="info-box1">
            <h2>Humidity</h2>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="info-box2">
            <h2>Condition</h2>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="info-box3">
            <h2>Wind Speed</h2>
            <p>{weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
