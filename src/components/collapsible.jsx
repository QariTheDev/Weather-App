import React from "react";
import { useState, useEffect } from "react";
import { apikey } from "./config";
import { CircularProgress } from "@mui/material";
import { getDayNameFromDate } from "./config";

export default function Collapsible(props) {

    const [open, setOpen] = useState(false);
    const [hrdata, setHrData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const toggle = () => {
        setOpen(!open);
    }
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };

    useEffect(() => {
        fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${props.City}&appid=${apikey}`
        )
        .then((res) => {
            if (res.status === 200) {
            error && setError(false);
            return res.json();
            } else {
            throw new Error("Something went wrong");
            }
        })
        .then((hrdata) => {
            setHrData(hrdata);
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }, [props.City, error]);
    
    function convertToAMPM(time24) {
      const [hours, minutes] = time24.split(':').map(Number);
      const meridiem = hours >= 12 ? 'PM' : 'AM';
      let hours12 = hours % 12 || 12;
      return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${meridiem}`;
    }
    
    

    return (
        loading ? (
          <CircularProgress />
        ) : (
          <>

      <div className="tab-container">
        {/* <h2 className="tip" >Click any button below to check hourly forecast</h2> */}
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
              <div className="collapse-box" onClick={toggle}>
                <img src={`https://openweathermap.org/img/wn/${hrdata.list[7].weather[0].icon}@2x.png`} alt="" />
                <h3><strong>{getDayNameFromDate((hrdata.list[7].dt_txt).slice(0, 10))}</strong></h3>
                <p style={{fontSize: '1rem'}}>{(hrdata.list[7].main.temp - 273.15).toFixed(0)} °C</p>
              </div>
              </button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
              <div className="collapse-box" onClick={toggle}>
                <img src={`https://openweathermap.org/img/wn/${hrdata.list[15].weather[0].icon}@2x.png`} alt="" />
                <h3><strong>{getDayNameFromDate((hrdata.list[15].dt_txt).slice(0, 10))}</strong></h3>
                <p style={{fontSize: '1rem'}}>{(hrdata.list[15].main.temp - 273.15).toFixed(0)} °C</p>
              </div>
              </button>
              <button
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
              >
              <div className="collapse-box" onClick={toggle}>
                <img src={`https://openweathermap.org/img/wn/${hrdata.list[23].weather[0].icon}@2x.png`} alt="" />
                <h3><strong>{getDayNameFromDate((hrdata.list[23].dt_txt).slice(0, 10))}</strong></h3>
                <p style={{fontSize: '1rem'}}>{(hrdata.list[23].main.temp - 273.15).toFixed(0)} °C</p>
              </div>
              </button>
              <button
                className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(4)}
              >
              <div className="collapse-box" onClick={toggle}>
                <img src={`https://openweathermap.org/img/wn/${hrdata.list[32].weather[0].icon}@2x.png`} alt="" />
                <h3><strong>{getDayNameFromDate((hrdata.list[31].dt_txt).slice(0, 10))}</strong></h3>
                <p style={{fontSize: '1rem'}}>{(hrdata.list[31].main.temp - 273.15).toFixed(0)} °C</p>
              </div>
              </button>
              <button
                className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(5)}
              >
              <div className="collapse-box" onClick={toggle}>
                <img src={`https://openweathermap.org/img/wn/${hrdata.list[39].weather[0].icon}@2x.png`} alt="" />
                <h3><strong>{getDayNameFromDate((hrdata.list[39].dt_txt).slice(0, 10))}</strong></h3>
                <p style={{fontSize: '1rem'}}>{(hrdata.list[39].main.temp - 273.15).toFixed(0)} °C</p>
              </div>
              </button>
            </div>

            <div className="content-tabs">
              <div
                className={toggleState === 1 ? "content  active-content" : "content"}
              >
                <h2 className="day-name" >{getDayNameFromDate((hrdata.list[7].dt_txt).slice(0, 10))}</h2>
                <p style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[3].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[3].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{(convertToAMPM((hrdata.list[3].dt_txt).slice(11)))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[5].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[5].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[5].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[6].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[6].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[6].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[7].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[7].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[7].dt_txt).slice(11))}</strong></h2>
                  </div>

                <div className="container" style={{height: '3rem'}}>
                  <div className="info">
                    <p>Feels like: {(hrdata.list[7].main.feels_like - 273.15).toFixed(0)} °C</p>
                    <p>Humidity: {hrdata.list[7].main.humidity}%</p>
                    <p>Wind: {hrdata.list[7].wind.speed} m/s</p>
                    <p>Pressure: {hrdata.list[7].main.pressure} hPa</p>
                    {( hrdata.list[7].weather[0].description).includes("rain") ? <p>Rain: {hrdata.list[7].rain["3h"]} mm</p> : <p>Rain: 0 mm</p>}
                    <p>Clouds: {hrdata.list[7].clouds.all}%</p>
                  </div>
                </div>
                  
                </p>
              </div>

              <div
                className={toggleState === 2 ? "content  active-content" : "content"}
              >
                <h2 className="day-name" >{getDayNameFromDate((hrdata.list[15].dt_txt).slice(0, 10))}</h2>
                <p style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[8].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[8].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[8].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[10].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[10].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[10].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[11].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[11].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[11].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[12].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[12].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[12].dt_txt).slice(11))}</strong></h2>
                  </div>

                <div className="container" style={{height: '3rem'}}>
                  <div className="info">
                    <p>Feels like: {(hrdata.list[15].main.feels_like - 273.15).toFixed(0)} °C</p>
                    <p>Humidity: {hrdata.list[15].main.humidity}%</p>
                    <p>Wind: {hrdata.list[15].wind.speed} m/s</p>
                    <p>Pressure: {hrdata.list[15].main.pressure} hPa</p>
                    {( hrdata.list[15].weather[0].description).includes("rain") ? <p>Rain: {hrdata.list[15].rain["3h"]} mm</p> : <p>Rain: 0 mm</p>}
                    <p>Clouds: {hrdata.list[15].clouds.all}%</p>
                  </div>
                </div>

                  </p>
              </div>

              <div
                className={toggleState === 3 ? "content  active-content" : "content"}
              >
                <h2 className="day-name" >{getDayNameFromDate((hrdata.list[23].dt_txt).slice(0, 10))}</h2>
                <p style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[16].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[16].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[16].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[18].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[18].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[18].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[19].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[19].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[19].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[20].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[20].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[20].dt_txt).slice(11))}</strong></h2>
                  </div>

                <div className="container" style={{height: '3rem'}}>
                  <div className="info">
                    <p>Feels like: {(hrdata.list[23].main.feels_like - 273.15).toFixed(0)} °C</p>
                    <p>Humidity: {hrdata.list[23].main.humidity}%</p>
                    <p>Wind: {hrdata.list[23].wind.speed} m/s</p>
                    <p>Pressure: {hrdata.list[23].main.pressure} hPa</p>
                    {( hrdata.list[23].weather[0].description).includes("rain") ? <p>Rain: {hrdata.list[23].rain["3h"]} mm</p> : <p>Rain: 0 mm</p>}
                    <p>Clouds: {hrdata.list[23].clouds.all}%</p>
                  </div>
                </div>
                  
                </p>
              </div>

              <div
                className={toggleState === 4 ? "content  active-content" : "content"}
              >
                <h2 className="day-name" >{getDayNameFromDate((hrdata.list[31].dt_txt).slice(0, 10))}</h2>
                <p style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[24].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[24].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[24].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[26].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[26].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[26].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[27].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[27].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[27].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[28].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[28].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[28].dt_txt).slice(11))}</strong></h2>
                  </div>

                <div className="io-container" style={{height: '3rem'}}>
                  <div className="info">
                    <p>Feels like: {(hrdata.list[31].main.feels_like - 273.15).toFixed(0)} °C</p>
                    <p>Humidity: {hrdata.list[31].main.humidity}%</p>
                    <p>Wind: {hrdata.list[31].wind.speed} m/s</p>
                    <p>Pressure: {hrdata.list[31].main.pressure} hPa</p>
                    {( hrdata.list[31].weather[0].description).includes("rain") ? <p>Rain: {hrdata.list[31].rain["3h"]} mm</p> : <p>Rain: 0 mm</p>}
                    <p>Clouds: {hrdata.list[31].clouds.all}%</p>
                  </div>
                </div>
                  
                </p>
              </div>

              <div
                className={toggleState === 5 ? "content  active-content" : "content"}
              >
                <h2 className="day-name" >{getDayNameFromDate((hrdata.list[39].dt_txt).slice(0, 10))}</h2>
                <p style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[32].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[32].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[32].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[34].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[34].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[34].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[35].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[35].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[35].dt_txt).slice(11))}</strong></h2>
                  </div>

                  <div className="inner-collapse-box" onClick={toggle}>
                    <img src={`https://openweathermap.org/img/wn/${hrdata.list[36].weather[0].icon}@2x.png`} alt="" />
                    <p style={{fontSize: '1rem'}}>{(hrdata.list[36].main.temp - 273.15).toFixed(0)} °C</p>
                    <h2><strong>{convertToAMPM((hrdata.list[36].dt_txt).slice(11))}</strong></h2>
                  </div>

                <div className="container" style={{height: 'rem'}}>
                  <div className="info">
                    <p>Feels like: {(hrdata.list[39].main.feels_like - 273.15).toFixed(0)} °C</p>
                    <p>Humidity: {hrdata.list[39].main.humidity}%</p>
                    <p>Wind: {hrdata.list[39].wind.speed} m/s</p>
                    <p>Pressure: {hrdata.list[39].main.pressure} hPa</p>
                    {( hrdata.list[39].weather[0].description).includes("rain") ? <p>Rain: {hrdata.list[39].rain["3h"]} mm</p> : <p>Rain: 0 mm</p>}
                    <p>Clouds: {hrdata.list[39].clouds.all}%</p>
                  </div>
                </div>
                  
                </p>
              </div>
            </div>
          </div>
          </>
        )
      );
}