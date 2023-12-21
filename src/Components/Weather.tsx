import React, { useEffect, useState } from "react";
import sunrise from "../Assets/Sunrise.png";
import sunset from "../Assets/sunset.svg";
import humidity_icon from "../Assets/humidity-bro.png";
import pressure_icon from "../Assets/pressure-icon-2048x2048-ucftza2t.png";
import wind_icon from "../Assets/wind-svgrepo-com.svg";
import * as CONSTANTS from "../Assets/CONSTANTS";
//https://nominatim.openstreetmap.org/search?format=json&q=
interface WeatherProps {
  City?: string;
}

const Weather: React.FC<WeatherProps> = ({ City }) => {
  const [latitude, setLatitude] = useState(51.509865);
  const [longitude, setLongitude] = useState(-0.118092);
  const [ip, setIp] = useState("8.8.8.8");
  const [city, setCity] = useState("London");
  const [icon, setIcon] = useState(" ");
  const [des, setDes] = useState(" ");
  const [temp, setTemp] = useState(12);
  const [_sunset, setSunstet] = useState(0);
  const [_sunrise, setSunrise] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [wind, setWind] = useState();
  const [wind_speed, setSpeed] = useState();
  let [dt, setDt] = useState(0);
  useEffect(() => {
    let ip_add = "https://api.ipify.org?format=json";
    function getIp() {
      fetch(ip_add)
        .then((response) => response.json())
        .then((data) => {
          setIp(data.ip);
        })
        .catch((err) => console.log(err));
    }
    let base___ = `https://api.ipgeolocation.io/ipgeo?apiKey=${CONSTANTS.api_key}&ip=${ip}`;

    function getLlat() {
      fetch(base___)
        .then((response) => response.json())
        .then((data) => {
          setLatitude(data.latitude);
          setLongitude(data.latitude);
        })
        .catch((err) => console.log(err));
    }
    getIp();
    getLlat();
    getData();
  }, []);
  //https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}
  const BASE_URL: string = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${CONSTANTS.W_key}`;

  async function getData() {
    try {
      let res = await fetch(BASE_URL, {
        method: "GET",
      });

      // Wait for the JSON data
      let data = await res.json();
      const l_city = data.name;
      setCity(l_city);
      const ico = data.weather[0].icon;
      const tepo = data.main.temp;
      const desss = data.weather[0].description;
      setSunstet(data.sys.sunset);
      setSunrise(data.sys.sunrise);
      setDt(data.dt);
      setHumidity(data.main.humidity);
      setPressure(data.main.pressure);
      setWind(data.wind);
      const deg = data.wind.deg;
      setWind(deg);
      const speed = data.wind.speed;
      setSpeed(speed);
      let conco = `https://openweathermap.org/img/wn/${ico}@2x.png`;
      setIcon(conco);
      setDes(desss);
      setTemp(tepo);

      // Log the actual data
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  const ssrand = new Date(_sunset).toLocaleString();
  const _ssrand = new Date(_sunrise).toLocaleString();
  const dts = new Date(dt).toLocaleString();

  const time = new Date().toLocaleString(undefined, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  return (
    <>
      <div className="sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center bg-slate-700 rounded-lg shadow-md">
        <div className="text-center sm:text-left">
          <div className="text-gray-700 text-lg font-bold mb-1">
            {city} at {dts}
          </div>
          <div className="text-5xl font-mono font-medium text-blue-600">
            {temp}°
          </div>
          <p className="text-gray-800 text-lg">{des}</p>
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-md text-black">
          <img src={sunrise} alt="Sunrise" className="h-10 w-10" />
          <p className="text-lg p-3">{_ssrand}</p>
          <img src={sunset} alt="Sunset" className="h-10 w-10" />
          <p className="text-lg p-3">{ssrand}</p>
        </div>

        <div className="flex justify-end mt-4 sm:mt-0">
          <img src={icon} alt="" height={100} width={100} className="" />
        </div>
      </div>
      <div className="p-4 rounded shadow-md flex flex-col items-center justify-around bg-white text-black sm:flex-row sm:justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <img
            src={humidity_icon}
            alt="humidity-icon"
            className="h-8 w-8 mr-2"
          />
          <p className="text-lg">{humidity}</p>
        </div>

        <div className="flex items-center mb-2 sm:mb-0">
          <img
            src={pressure_icon}
            alt="pressure-icon"
            className="h-8 w-8 mr-2"
          />
          <p className="text-lg">{pressure}</p>
        </div>

        <div className="flex items-center">
          <img src={wind_icon} alt="wind-icon" className="h-8 w-8 mr-2" />
          <p className="text-lg">
            {wind}° at a speed of {wind_speed}
          </p>
        </div>
      </div>
    </>
  );
};

export default Weather;
