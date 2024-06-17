import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "4d3ef14266c14f5d20be5aeb257a59b0";

function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setInputSearch("");
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const firstRender = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Patna&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log(error);
      }
    };

    firstRender();
  }, []);

  return (
    <>
      <form>
        <input type="text" value={inputSearch} onChange={handleChange} />
        <button onClick={handleClick}>Search</button>
      </form>
      <div>
        {weatherData && (
          <div>
            <h2>Weather in {weatherData.name}</h2>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
