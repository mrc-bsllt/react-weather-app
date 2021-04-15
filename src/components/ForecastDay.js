import '../css/ForecastDay.css';

const ForecastDay = ({ item }) => {
  const actualTemp = `${Math.round(item.main.temp)}°`;

  return (
    <section className="next_forecast">
      <h5>{ item.dayName }</h5>
      <img src={ item.icon_url } alt="weather_icon"/>
      <small>{ item.weather[0].description }</small>
      <small>Temperatura: { actualTemp }</small>
    </section>
  )

}

export default ForecastDay;
