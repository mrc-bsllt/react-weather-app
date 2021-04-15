import LocalDate from "./LocalDate";
import ForecastDay from "./ForecastDay";
import '../css/City.css';
import { GiSunrise, GiSunset } from 'react-icons/gi';

const City = ({ city, date, forecast, bgProperties }) => {
    const name = city.name;
    const icon = city.weather[0].icon;
    const icon_url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const description = city.weather[0].description;
    const sunrise = new Date(city.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const sunset = new Date(city.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const actualTemp = `${Math.round(city.main.temp)}°`;
    const maxTemp = `${Math.round(city.main.temp_max)}°`;
    const minTemp = `${Math.round(city.main.temp_min)}°`;

    return (
      <div className="city_container">
        <div className="top">

          <section className="left">
            <div className={`icon_container ${bgProperties.secondary_color}`}>
              <img src={ icon_url } alt="weather_icon"/>
            </div>
            <small>{ description }</small>
          </section>

          <section className="right">
            <h1>{ name }</h1>

            <section className="icons_box">
              <p>{ sunrise } <GiSunrise className="sun_icon"/></p>
              <p>{ sunset } <GiSunset className="sun_icon"/></p>
            </section>

            <section id="temp_section">
              <div className={ `temp_box ${bgProperties.secondary_color}` }>
                <div className="temp_text">
                  <h4>Temp.</h4>
                  <p>{ actualTemp }</p>
                </div>
              </div>
              <div className="temp_box bg_red">
                <div className="temp_text">
                  <h4>Max</h4>
                  <p>{ maxTemp }</p>
                </div>
              </div>
              <div className="temp_box bg_blue">
                <div className="temp_text">
                  <h4>Min</h4>
                  <p>{ minTemp }</p>
                </div>
              </div>
            </section>
          </section>
        </div>

        <div className="bottom">
          { forecast.map((item, index) => <ForecastDay key={ index } item={ item }/> ) }
        </div>

        <div className="date_time">
          <LocalDate city={ city } date={ date }/>
        </div>
      </div>
    )

}

export default City;
