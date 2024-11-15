import React, { useState } from 'react'
import './weather.css';

const api = {
  base: "https://api.openweathermap.org/data/2.5/"
}

export const Weather = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});

  const search = k => {
    if (k.key === "Enter") {
      fetch(`${api.base}weather?q=${location}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(result => {
          // console.log(result)
          setWeather(result);
          setLocation('')
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   
    let day=days[d.getDay()];
    let date=d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={(typeof weather.main!="undefined")?
      ((weather.main.temp>16)?
    'app warm': 'app'): 'normal'}>
      <main>
        <div className='search-box'>
          <input type='text' placeholder='Enter Location' value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyPress={search} />
        </div>

{(typeof weather.main != "undefined")?(
     <div>
     <div className='location-box'>
       <div className='location'>
         {weather.name},{weather.sys.country}
         </div>
         <div className='date'>
           {dateBuilder(new Date())}
         </div>
         <div className='weather-box'>
           <div className='temp'>
             {Math.round(weather.main.temp)}°C
           </div>

           <div className='weather'>
            {weather.weather[0].main}
           </div>
         </div>
       </div>
     </div>
):(" ")}
      </main>
    </div>
  )
}
