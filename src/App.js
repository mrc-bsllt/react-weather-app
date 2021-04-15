import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderCustom from "./components/HeaderCustom";
import WeatherPanel from "./components/WeatherPanel";
import ToggleButton from "./components/ToggleButton";

const App = () => {
  const api_url_now = "http://api.openweathermap.org/data/2.5/weather";
  const api_url_forecast = "http://api.openweathermap.org/data/2.5/forecast";
  const appid = "299a77a4bafdd679a8f084195c801edc";
  const lang = "it";
  const units = "metric";

  const [city, setCity] = useState();
  const [date, setDate] = useState();
  const [search, setSearch] = useState("Thiene");
  const [time, setTime] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [bgProperties, setBgProperties] = useState({ status: "dark" });

  //funzione per calcolare la data esatta del luogo selezionato
  const getDate = (ref) => {
    const now = new Date();
    const date_ms = now.getTimezoneOffset() * 60 * 1000 + now.getTime();
    const locale_date = new Date(date_ms + (ref * 1000)).toLocaleString();
    return locale_date;
  }

  //funzione che fa la chiamata axios per popolare la constante city
  const getCity = () => {
    axios
      .get(api_url_now, { params: { appid, lang, units, q: search } })
      .then(
        (response) => {
          const resultCity = response.data;
          setCity(resultCity);

          setTime(setInterval(() => {
              setDate(getDate(resultCity.timezone));
            }, 1000)
          );

        }
      );
  }

  //funzione che fa la chiamata axios per popolare la constante city
  const getForecast = () => {
    axios
      .get(api_url_forecast, { params: { appid, lang, units, q: search } })
      .then(
        (response) => {
          const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
          const today = days[new Date(Date.now()).getDay()];
          const list = response.data.list;
          const supportArray = [];
          const nextForecast = [];

          list.forEach(
            (element) => {
              let elementDay = days[new Date(element.dt * 1000).getDay()];

              if (elementDay !== today && !supportArray.includes(elementDay)) {
                supportArray.push(elementDay);
                nextForecast.push({...element, dayName: elementDay, icon_url: `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`});
              }
            });
            setForecast(nextForecast);
        }
      );
  }

  // funzione per cambiare la città da cercare
  const getUserSearch = (value) => {
    clearInterval(time);
    setSearch(value);
  }

  //funzione per settare le proprietà css dei background di sfondo
  const getBgProperties = () => {
    if(bgProperties.status === "dark") {

      setBgProperties({
        ...bgProperties,
        primary_color: "bg_black",
        secondary_color: "bg_green",
        app: "bg_darkgrey",
        font: "cl_grey"
      });

    } else {

      setBgProperties({
        ...bgProperties,
        primary_color: "bg_lightgrey",
        secondary_color: "bg_lightblue",
        app: "bg_lightgreen",
        font: "cl_black"
      });

    }
  }

  //funzione per fare il toggle dei colori
  const toggleColor = () => {
    if (bgProperties.status === "dark") {
      bgProperties.status = "light";
    } else {
      bgProperties.status = "dark"
    }
  }

  useEffect(() => {
    getBgProperties();
    getCity();
    getForecast();

  }, [search, bgProperties.status])

  if (!city) return null;

  return (
    <div className={`App ${bgProperties.app}`}>
      <ToggleButton bgProperties={ bgProperties } toggleColor={ toggleColor }/>
      <HeaderCustom getUserSearch={ getUserSearch } bgProperties={ bgProperties }/>
      <WeatherPanel city={ city } date={ date } forecast={ forecast } bgProperties={ bgProperties }/>
    </div>
  );
}

export default App;
