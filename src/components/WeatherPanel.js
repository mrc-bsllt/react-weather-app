import '../css/WeatherPanel.css';
import City from "./City";

const WeatherPanel = ({ city, date, forecast, bgProperties }) => {

  return (
    <div className={ `panel  ${bgProperties.primary_color} ${bgProperties.font}` }>
      <City city={ city } date={ date } forecast={ forecast } bgProperties={ bgProperties }/>
    </div>
  )

}

export default WeatherPanel;
