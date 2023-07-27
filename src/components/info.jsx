import Box from "./box";
import React, { useState, useEffect } from 'react';
import Date from "./date";
import Forecast from "./forecast";
import { apikey } from "./config";
import { CircularProgress, Fade, Slide} from "@mui/material";
import thunder from "./images/thunder.jpg";
import cloudy from "./images/broken-clouds.jpg";
import drizzle from "./images/drizzle.jpg";
// import rain from "./images/rain.jpeg";
import snow from "./images/snow.jpeg";
import mist from "./images/mist.jpeg";
import smoke from "./images/smoke.jpg";
import haze from "./images/haze.jpg";
import dust from "./images/dust.png";
import fog from "./images/fog.jpg";
import sand from "./images/sand-dust.jpg";
import ash from "./images/ash.jpeg";
import squall from "./images/overcast-clouds.jpg";
import tornado from "./images/tornado.jpg";
import clear from "./images/clear-sky.jpg";
import Collapsible from "./collapsible";

let citycopy = "Lahore";

export default function Info() {

    const [cityName, setCityName] = useState("Lahore");
    const [inputText, setInputText] = useState("");
    const [data, setData] = useState({});
    const [hrdata, setHrData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`
        )
        .then((res) => {
            if (res.status === 200) {
            error && setError(false);
            return res.json();
            } else {
            throw new Error("Something went wrong");
            }
        })
        .then((data) => {
            setData(data);
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }, [cityName, error]);

    useEffect(() => {
        fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${citycopy}&appid=${apikey}`
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
    }, [cityName, error]);


    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setCityName(e.target.value);
            citycopy = e.target.value;
            console.log("citycopy = " + citycopy + " cityName = " + cityName);
            setInputText("");
        }
    };

    const default_bg = thunder;
    const weatherType = data?.weather?.[0]?.main || "";
    const setBg = (weatherType) => { 
        switch (weatherType) {

            case "Thunderstorm":
                return thunder;
            case "Drizzle":
                return drizzle;
            case "Rain":
                return thunder;
            case "Snow":
                return snow;
            case "Mist":
                return mist;
            case "Smoke":
                return smoke;
            case "Haze":
                return haze;
            case "Dust":
                return dust;
            case "Fog":
                return fog;
            case "Sand":
                return sand;
            case "Ash":
                return ash;
            case "Squall":
                return squall;
            case "Tornado":
                return tornado;
            case "Clouds":
                if ((data.main.temp - 273.15).toFixed(0) < 0){
                    return snow;
                }
                else{
                    return cloudy;
                }
            case "Clear":
                return clear;

            default:
                return default_bg;
            
        }
    }

    return (
        <>
            <div className="bg_img" style={{ backgroundImage: `url(${setBg(weatherType)})` }}>
                { loading ? (
                    <>
                        <CircularProgress />
                    </>
                ):
                (
                    <> 
                        <div className="date">
                            <Date />
                        </div>

                        <Fade in={!loading} timeout={1500}>
                            <input 
                            className="weather-input" 
                            type="text"
                            placeholder="Enter City..." 
                            error={error}
                            onChange={e => setInputText(e.target.value)} 
                            value={inputText} 
                            onKeyDown={handleSearch} 
                            variant="filled" 
                            />
                        </Fade>

                        <Fade in={!loading} timeout={1500}>
                            <h1 className="city">{data.name}</h1>
                        </Fade>

                        <Fade in={!loading} timeout={1500}>
                            <div className="group">
                                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                                <h1>{data.weather[0].main}</h1>
                            </div>
                        </Fade>

                        <Fade in={!loading} timeout={1500}>
                            <h1 className="temp">{(data.main.temp - 273.15).toFixed(0) + ' °C'}</h1>
                        </Fade>

                        
                        <Slide direction="up" in={true} timeout={800} style={{marginBottom: '8rem'}}>
                            <div className="box_container">
                                <Box title="Wind Speed" value={data.wind.speed.toFixed(0) + ' km/h'} />
                                <Box title="Humidity" value={data.main.humidity + ' %'} />
                                <Box title="Pressure" value={data.main.pressure + ' Hg'} />
                                <Box title="Clouds" value={data.clouds.all + ' %'} />
                                <Box title="Feels Like" value={(data.main.feels_like - 273.15).toFixed(0) + ' °C'} />
                            </div>
                        </Slide>
                    
                        <Forecast title={hrdata} City={cityName}/>

                        <Fade in={!loading} timeout={1500}>
                            <div className="collapse-container" style={{marginTop: '8rem'}}>
                                <Collapsible City={cityName}/>
                            </div>
                        </Fade>
                    </>
                )}
            </div>
        </>
    );
}


export {citycopy};