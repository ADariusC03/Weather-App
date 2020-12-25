import React, { useState } from 'react';



// api key from openweathermap.org
const api = {
  key: "d9399e907b6ef87250d9d6d5054f0d97",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // evt == event
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 35) ? 'app warm' : 'app') : 'app'}>
     <main>
      <div className="search-box"> 
      <input
        type="type"
        className="search-bar"
        placeholder="Search...."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      />
      </div>
      {(typeof weather.main != "undefined") ? ( 
       <div>
        <div className="location-box">
         <div className="location">{weather.name}, {weather.sys.country}</div>
         <div className="date">{dateBuilder(new Date())}</div>
       </div>
       <div className="weather-box">
        <div className="temp">
          {Math.round(weather.main.temp)}°F
        </div>
      <div className="weather"> {weather.weather[0].main}</div>
       </div>
      </div>
      ) : ('')}
     </main>
    </div>
  );
}

export default App;
