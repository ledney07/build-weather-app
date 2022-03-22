import React, {useEffect, useState, useRef} from 'react';
import './App.css';
import axios from "axios";
import moment from 'moment';

function App() { 
  const [weatherInfo, setWeatherInfo] = useState(null)
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)

  useEffect(() => {
    fetchWeatherData()
  },[])

  useEffect(() =>{
    determineBackgroundImage()
  },[weatherInfo])

  const determineBackgroundImage =()=>{
    if(weatherInfo?.main.temp < 10){
      setImage("https://images.unsplash.com/photo-1514632595-4944383f2737?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
    }
    if(weatherInfo?.main.temp >= 10){
      setImage("https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80")
    }
  }

  const fetchWeatherData = (e) =>{
    e?.preventDefault()
    // OR
    //e && e.preventDefault() 

   const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: inputRef.current.value, // new york
        lat: '0',
        lon: '0',
        callback: '',
        id: '2172797',
        lang: 'null',
        units: 'imperial',
        mode: 'xml, html'
      },
      headers: {
       'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
       'x-rapidapi-key': 
      }
    };

    axios
      .request(options)
      .then((response) => {
        setWeatherInfo(response.data)
      })
      .catch((error) => {console.error(error)});
  }

  return (
    <main className="app" style={{backgroundImage: `url(${image})`}}>
     <div className="app__container">
     <h1 className="app__container-title"> Our weather app</h1>
      <form className="app__container-form">
       <input  className="app__container-input" ref={inputRef} type="text" placeholder="Type the city"/>
        <button className="app__container-btn" onClick={fetchWeatherData} type="submit">Show me the weather</button>
      </form>
      
      <div className="app__container details">
        <h3 className="app__container-name">{weatherInfo?.name}</h3>
        <h3 className="app__container-temp">{weatherInfo?.main.temp} Degrees Celsius</h3>
        <h3 className="app__container-date">{moment.unix(weatherInfo?.sys?.sunrise).format("LLLL")}</h3>
      </div>
     </div>
    </main>
  );
}

export default App;



// {new Date(parseInt(weatherInfo?.sys?.sunrise * 1000)).toDateString()}

 /*
 you can the JSON also to this : .then((response) => {console.log(JSON.parse(response.data.substring(5, response.data.length -1)))})
*/ 