import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './WeatherContainer.scss';
import { addCity, deleteCity } from '../../redux/actions/locationActions';

const WeatherContainer = ({ city, cities, addCity, deleteCity }) => {
  const API_KEY = 'e36ca5c9259a10df068bc915c2f2b4a4';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCity = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        addCity(getCity.data);
        console.log('get: ', getCity);
        const latLon = {
          lat: getCity.data.coord.lat,
          lon: getCity.data.coord.lon,
        };
        console.log(latLon);
        const getWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`
        );
        console.log(getWeather);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [city, addCity]);

  const calculateAverageTemp = (temp) => {
    let averageTemp = (temp.morn + temp.day + temp.eve + temp.night) / 4 - 273;
    let rounded = averageTemp.toFixed(1);

    return rounded;
  };

  const calculateSunrise = (sunrise) => {
    let date = new Date(sunrise * 1000);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();

    let amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedTime = 'At' + hours + ':' + minutes + amPm;

    return formattedTime;
  };

  const calculateSunset = (sunset) => {
    let date = new Date(sunset * 1000);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();

    let amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedTime = 'At' + hours + ':' + minutes + amPm;

    return formattedTime;
  };

  return (
    <div className='weather-container'>
      <div className='details-container'>
        <div className='top-details'>
          <div className='degree-location'>
            <div className='degree'>24&deg;</div>
            <div className='location'>Split</div>
          </div>
          <div className='weather-image'></div>
        </div>

        <div className='middle-details'>
          <p className='min'>Min. -10&deg;</p>
          <p className='max'>Max. 25&deg;</p>
        </div>

        <div className='bottom-details'>
          <ul className='days-container'>
            <li className='days-item'>
              <p className='days-title'>Today</p>
            </li>
            <li className='days-item'>
              <p className='days-title'>Tomorrow</p>
            </li>
            <li className='days-item'>
              <p className='days-title'>Wednesday</p>
            </li>
          </ul>
          <div className='sunrise-sunset'>
            <div className='sunrise'>
              <p className='sunrise-title'>SUNRISE</p>
              <p className='sunrise-details'>At 6:30am</p>
            </div>
            <div className='sunset'>
              <p className='sunset-title'>SUNSET</p>
              <p className='sunset-details'>At 7:21pm</p>
            </div>
          </div>
        </div>
      </div>

      <div className='favorites-container'>
        <p className='favorite-city-title'>Favorite city</p>
        <ul className='city-container'>
          {cities.map((city) => (
            <li className='city-item' key={city.id}>
              <div className='city'>{city.name}</div>
              <div
                className='cancel-btn'
                onClick={() => deleteCity(city.id)}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    city: state.locationReducer.city,
    cities: state.locationReducer.cities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCity: bindActionCreators(addCity, dispatch),
    deleteCity: bindActionCreators(deleteCity, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
