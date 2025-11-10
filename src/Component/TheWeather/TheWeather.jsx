import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

const TheWeather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=60e202e9ee964f0f95955b83553b8a79&units=metric"
        );
        setWeatherData(res.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
      <Box
        component="section"
        sx={{
          p: 2,
          padding: "18px",
    border: "1px solid grey",
    width: "300PX",
    height: "auto",
    margin: "2rem auto",
        }}
        style={{ color: "#ffffffff" }}
      >
        <div className="Hader_wehather">
          <h1>{weatherData ? weatherData.name : "Loading..."}</h1>
                  <p  style={{marginTop:"3rem"}}>{new Date().toLocaleDateString()}</p>

        </div>

        <hr style={{ border: "1px solid white" }} />

        {weatherData && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "10rem", alignItems: "center" }}>
                <h2>{weatherData.main.temp}°C</h2>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </div>
              <p>{weatherData.weather[0].description}</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <p>Min: {weatherData.main.temp_min}°C</p>
                <p>|</p>
                <p>Max: {weatherData.main.temp_max}°C</p>
              </div>
            </div>

            <div>
            </div>
          </div>
        )}
      </Box>
    </>
  );
};

export default TheWeather;
