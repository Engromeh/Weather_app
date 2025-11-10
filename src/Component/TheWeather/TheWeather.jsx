import React, { useEffect, useReducer, useState } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

// ✅ Reducer الصحيح
function languageReducer(state, action) {
  switch (action.type) {
    case "toggleLanguage":
      return state === "en" ? "ar" : "en";
    default:
      return state;
  }
}

const TheWeather = () => {
  const [language, dispatch] = useReducer(languageReducer, "en");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=60e202e9ee964f0f95955b83553b8a79&units=metric&lang=${language}`
        );
        setWeatherData(res.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [language]); // ✅ عشان يعيد الجلب عند تغيير اللغة

  return (
    <>
      <button
        onClick={() => dispatch({ type: "toggleLanguage" })}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          background: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {language === "en" ? "تغيير إلى العربية" : "Change to English"}
      </button>

      <Box
        component="section"
        sx={{
          p: 2,
          border: "1px solid grey",
          width: "300px",
          margin: "2rem auto",
        }}
        style={{
          color: "#ffffff",
          textAlign: language === "en" ? "left" : "right",
        }}
      >
        <div className="Hader_wehather" style={{ textAlign: language === "en" ? "left" : "right",}}>
          <h1>
            {weatherData
              ? weatherData.name
              : language === "en"
              ? "Loading..."
              : "جار التحميل..."}
          </h1>
          <p style={{ marginTop: "1rem" }}>
            {new Date().toLocaleDateString(
              language === "ar" ? "ar-EG" : "en-US"
            )}
          </p>
        </div>

        <hr style={{ border: "1px solid white" }} />

        {weatherData && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
              flexDirection: language === "ar" ? "row-reverse" : "row",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <h2>{weatherData.main.temp}°C</h2>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </div>
              <p>{weatherData.weather[0].description}</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <p>
                  {language === "en" ? "Min:" : "أدنى"}{" "}
                  {weatherData.main.temp_min}°C
                </p>
                <p>|</p>
                <p>
                  {language === "en" ? "Max:" : "أقصى"}{" "}
                  {weatherData.main.temp_max}°C
                </p>
              </div>
            </div>
          </div>
        )}
      </Box>
    </>
  );
};

export default TheWeather;
