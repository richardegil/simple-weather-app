import React, { useState } from "react";
// import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const token = process.env.OPENWEATHER_TOKEN;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${token}`;
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetch(url)
        .then(res => {
          if (res.ok) return res.json()
          return Promise.reject(res)
        })
        .then((json) => {
          setData(json)
          setErrorMsg('')
        })
        .catch((error) => {
          setErrorMsg(error.statusText);
          console.error('Error:', error)
      })
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        {errorMsg !== '' &&
          <p>{errorMsg}</p>
        }
        {data.name !== undefined && errorMsg === '' &&
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
        }
        {data.name !== undefined && errorMsg === '' &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Hummidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
      
    </div>
  );
}

export default App;
