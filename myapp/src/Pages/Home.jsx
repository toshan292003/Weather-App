import { React, useState, useEffect } from "react";
import "./home.css";

// Import all icons, All Icons are in PNG format
import rain from "../Icons/rain.png";
import sunny from "../Icons/sunny.png";
import wind from "../Icons/wind.png";
import sun from "../Icons/sun.png";
import thunder from "../Icons/thunder.png";
import sunrise from "../Icons/sunrise.png";
import sunset from "../Icons/sunset.png";
import bus from "../Icons/bus.png";
import car from "../Icons/car.png";
import cylinder from "../Icons/cylinder.png";
import eye from "../Icons/eye.png";
import mosquito from "../Icons/mosquito.png";
import plane from "../Icons/plane.png";
import pollen from "../Icons/pollen.png";
import run from "../Icons/run.png";
import thermometer from "../Icons/thermometer.png";
import umbrella from "../Icons/umbrella.png";
import water from "../Icons/water.png";
import wave from "../Icons/wave.png";

export default function Home() {

    // Initializing State Variables to get data from API
    const [CurData, setCurData] = useState(null);
    const [ForecaseData, setForecaseData] = useState(null);
    const [AddData, setAddData] = useState(null);

    // Initializing State Variable to Manage 7 days and 15 days Forecast Display
    const [DaysButton, setDaysButton] = useState(15);


    //Function and useEffect hook to get data from API.
    //KEY ISSUE : The JSON.parse is not working and I wasn't able to convert the text file from the API to JSON data. This function returns an error in the console. 
    const fetchCurWeather = () => {
        fetch('https://raw.githubusercontent.com/Surya-Digital-Interviews/weather-api-public/main/get-current-weather.txt')
            .then((response) => response.text())
            .then((data) => {
                const lines = data.split('\n');
                const jsonData = {};
                lines.forEach(line => {
                    const [key, value] = line.split(":").map(item => item.trim());
                    if (key && value) {
                        jsonData[key] = value;
                    }
                });
                setCurData(jsonData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchForecastData = () => {
        fetch("https://raw.githubusercontent.com/Surya-Digital-Interviews/weather-api-public/main/get-forecast.txt")
            .then((response) => response.text())
            .then((data) => {
                const objectData = data.split("\n\n");
                const Forecast = []
                objectData.forEach(object => {
                    const lines = object.split("\n");
                    const day = {}
                    lines.forEach(line => {
                        const [key, value] = line.split(":").map(item => item.trim());
                        if (key && value) {
                            day[key] = value;
                        }
                    })
                    Forecast.push(day);
                });
                setForecaseData(Forecast);
            })
            .catch((error) => {
                console.error("Error Fetching data: ", error);
            });
    }

    const fetchAddData = () => {
        fetch("https://raw.githubusercontent.com/Surya-Digital-Interviews/weather-api-public/main/get-climate-details.txt")
            .then((response) => response.text())
            .then((data) => {
                const objects = data.split("\n\n");
                const Add = []
                objects.forEach((object) => {
                    const lines = object.split("\n");
                    const details = {}
                    lines.forEach((line) => {
                        const [key, value] = line.split(": ").map(item => item.trim());
                        if (key && value) {
                            details[key] = value;
                        }
                    });
                    Add.push(details);
                });
                console.log(Add);
                setAddData(Add);
            })
    }

    useEffect(() => {
        fetchCurWeather();
        fetchForecastData();
        fetchAddData();
        return () => { };
    }, []);


    //Function to switch between 7 day and 15 days weather forecast
    const toggleDays = () => {
        if (DaysButton == 7) {
            setDaysButton(15);
        }
        else if (DaysButton == 15) {
            setDaysButton(7);
        }
    }

    //Function to Position the Range variable in the Air Quality Index Menu
    const getSatisfactory = (satisfaction) => {
        let x = satisfaction;
        let ans = x + "px";
        return ans;
    }


    //A function that Takes weather Info and returns the respective weather Icon
    const getWeatherImage = (weather) => {
        if (weather === "sunny") {
            return sunny;
        }
        else if (weather === "rain") {
            return rain;
        }
        else if (weather === "wind") {
            return wind;
        }
        else if (weather === "sun") {
            return sun;
        }
        else if (weather === "thunderstorm") {
            return thunder;
        }
        else if (weather === "UV Index") {
            return sun;
        }
        else if (weather === "Feels like") {
            return thermometer;
        }
        else if (weather === "Humidity") {
            return water;
        }
        else if (weather === "ESE wind") {
            return wind;
        }
        else if (weather === "Air Pressure") {
            return wave;
        }
        else if (weather === "Visibility") {
            return eye;
        }
        else if (weather === "pollen") {
            return pollen;
        }
        else if (weather === "umbrella") {
            return umbrella;
        }
        else if (weather === "cylinder") {
            return cylinder;
        }
        else if (weather === "car") {
            return car;
        }
        else if (weather === "run") {
            return run;
        }
        else if (weather === "bus") {
            return bus;
        }
        else if (weather === "plane") {
            return plane;
        }
        else if (weather === "mosquito") {
            return mosquito;
        }
    }

    return (
        <>
            <div className="mainbody">
                <section className="current-weather">
                    {
                        CurData ? (
                            <>
                                <h3>{CurData.place}</h3>
                                <h1>{CurData.maximum_temperature}°</h1>
                                <p>{CurData.weather_summary} {CurData.minimum_temperature}°/{CurData.maximum_temperature}°</p>
                                <p>Air Quality: {CurData.air_quality} - {CurData.air_quality_summary}</p>
                            </>
                        )
                            :
                            (<></>)
                    }
                </section>
                <section className="forecast-ui">
                    {
                        ForecaseData ? (
                            <>
                                {
                                    ForecaseData.map((user, index) => (
                                        user.category === "12_hour" && (index <= 4) ? (
                                            (
                                                user.time === "current" ? (
                                                    <div>
                                                        <span>Nov</span>
                                                        <img src={getWeatherImage(user.weather)} />
                                                        <h4>{user.temp}</h4>
                                                    </div>
                                                )
                                                    :
                                                    (
                                                        <div>
                                                            <span>{user.time}</span>
                                                            <img src={getWeatherImage(user.weather)} />
                                                            <h4>{user.temp}</h4>
                                                        </div>
                                                    )
                                            )

                                        )
                                            :
                                            (<></>)
                                    ))
                                }

                            </>
                        )
                            :
                            (<></>)
                    }
                </section>
                <section className="forecast-ui2">
                    <div>
                        {
                            ForecaseData ? (
                                <>
                                    {
                                        ForecaseData.map((user, index) => (
                                            user.category === "15_day" && (index >= 14 && index <= 21) ? (
                                                <div>
                                                    <span>{user.date} {user.day}</span>
                                                    <img src={getWeatherImage(user.weather)} />
                                                    <h4>{user.minimum_temperature}°/{user.maximum_temperature}°</h4>
                                                </div>
                                            )
                                                :
                                                (
                                                    <></>
                                                )
                                        ))
                                    }

                                </>
                            )
                                :
                                (<></>)
                        }
                    </div>
                    <div>
                        {
                            ForecaseData ? (
                                <>
                                    {
                                        ForecaseData.map((user, index) => (
                                            user.category === "15_day" && (index >= 22 && index <= 28) && DaysButton == 7 ? (
                                                <div>
                                                    <span>{user.date} {user.day}</span>
                                                    <img src={getWeatherImage(user.weather)} />
                                                    <h4>{user.minimum_temperature}°/{user.maximum_temperature}°</h4>
                                                </div>
                                            )
                                                :
                                                (
                                                    <></>
                                                )
                                        ))
                                    }

                                </>
                            )
                                :
                                (<></>)
                        }
                    </div>
                    <hr />
                    <button onClick={toggleDays}>{DaysButton} Day Weather Forecast ^</button>
                </section>
                <section className="additional-details">
                    {
                        AddData ? (
                            <div className="addbox">
                                <div className="additem">
                                    <p>
                                        <img src={sunrise} alt="" />
                                        <span>{AddData[0].sunrise}</span>
                                    </p>
                                    <p>
                                        <img src={sunset} alt="" />
                                        <span>{AddData[0].sunset}</span>
                                    </p>
                                </div>
                                <div className="sunrise">
                                    <b style={{ width: "50%" }}></b>
                                    <img src={sun} alt="" style={{ height: "25px" }} />
                                    <b style={{ width: "40%", backgroundColor: "rgba(255,255,255,0.5)" }}></b>
                                </div>
                            </div>
                        )
                            :
                            (<></>)
                    }
                </section>
                <section className="additional-details">
                    {
                        AddData ? (
                            <>
                                <div className="aqi">
                                    <p>AQI (Air Quality Index)</p>
                                    <hr />
                                    <h6>{AddData[1].summary} {AddData[1].value}</h6>
                                </div>
                                <div className="AQI">
                                    <b></b>
                                    <span style={{ left: getSatisfactory(AddData[1].value) }}></span>
                                </div>
                            </>
                        )
                            :
                            (<></>)
                    }
                </section>

                <section className="box">
                    {
                        AddData ? (
                            <>
                                {
                                    AddData.map((user, index) => (
                                        user.category === "other" ? (
                                            <div>
                                                <p>
                                                    <span><img src={getWeatherImage(user.name)} alt="" /></span>
                                                    <span>  {user.name}</span>
                                                </p>
                                                <p>
                                                    <span>{user.value} {user.summary}</span>
                                                </p>
                                            </div>
                                        )
                                            :
                                            (<></>)
                                    ))
                                }
                            </>
                        )
                            :
                            (<></>)
                    }
                </section>

                <section className="additional">
                    {
                        AddData ? (
                            <>
                                <h2>LifeStyle Tips</h2>
                                <hr />
                                <div className="container">
                                    {
                                        AddData.map((user, index) => (
                                            user.category === "lifestyle_tips" ? (
                                                <div>
                                                    <img src={getWeatherImage(user.icon)} alt="" />
                                                    <span>{user.tip}</span>
                                                </div>
                                            )
                                                :
                                                (<></>)
                                        ))
                                    }
                                </div>
                            </>
                        )
                        :
                        (<></>)
                    }
                </section>
            </div>
        </>
    )
}