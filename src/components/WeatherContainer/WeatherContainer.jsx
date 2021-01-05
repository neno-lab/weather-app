import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './WeatherContainer.scss';
import {
  addCity,
  deleteCity,
  favoriteCityWeather,
} from '../../redux/actions/locationActions';

const WeatherContainer = ({
  city,
  cities,
  addCity,
  deleteCity,
  favoriteCityWeather,
  favoriteCity,
}) => {
  const API_KEY = 'e36ca5c9259a10df068bc915c2f2b4a4';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCity = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

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

        let cityProps = {
          id: getCity.data.id,
          name: getCity.data.name,
          daily: getWeather.data.daily.slice(0, 3),
        };
        addCity(cityProps);
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
    let minutes = date.getMinutes();

    let amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? minutes : minutes;
    let formattedTime = 'At ' + hours + ':' + minutes + amPm;

    return formattedTime;
  };

  const calculateSunset = (sunset) => {
    let date = new Date(sunset * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? minutes : minutes;
    let formattedTime = 'At ' + hours + ':' + minutes + amPm;

    return formattedTime;
  };

  const [isFavoriteCity, setIsFavoriteCity] = useState(false);
  const [isToday, setIsToday] = useState(false);

  const favoriteSubmit = (e, city) => {
    e.preventDefault();
    console.log('clicked!');
    // console.log(city);
    favoriteCityWeather(city);
    setIsFavoriteCity(true);
    setIsToday(false);
    console.log('city: ', city);
  };

  const todaySubmit = (e) => {
    e.preventDefault();
    setIsToday(true);
    setIsFavoriteCity(false);
  };

  return (
    <div className='weather-container'>
      <div className='details-container'>
        <div className='top-details'>
          <div className='degree-location'>
            <div className='degree'>
              {isFavoriteCity && favoriteCity.id}
              {isToday && favoriteCity.name}
            </div>
            <div className='location'>Split</div>
          </div>
          <div className='weather-image'></div>
        </div>

        <div className='middle-details'>
          <p className='min'>
            Min.
            {/* Min. {(favoriteCity.temp.min - 273).toFixed(0)}&deg; */}
          </p>
          <p className='max'>
            Max.
            {/* Max. {(favoriteCity.temp.max - 273).toFixed(0)}&deg; */}
          </p>
        </div>

        <div className='bottom-details'>
          <ul className='days-container'>
            <li className='days-item'>
              <p
                className='days-title'
                tabIndex='1'
                onClick={(e) => todaySubmit(e)}
              >
                Today
              </p>
            </li>
            <li className='days-item'>
              <p className='days-title' tabIndex='1'>
                Tomorrow
              </p>
            </li>
            <li className='days-item'>
              <p className='days-title' tabIndex='1'>
                Wednesday
              </p>
            </li>
          </ul>
          <div className='sunrise-sunset'>
            <div className='sunrise'>
              <p className='sunrise-title'>SUNRISE</p>
              <p className='sunrise-details'>
                {/* {calculateSunrise(favoriteCity.sunrise)} */}
              </p>
            </div>
            <div className='sunset'>
              <p className='sunset-title'>SUNSET</p>
              <p className='sunset-details'>
                {/* {calculateSunset(favoriteCity.sunset)} */}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='favorites-container'>
        <p className='favorite-city-title'>Favorite city</p>
        <ul className='city-container'>
          {cities.map((city) => (
            <li
              className='city-item'
              key={city.id}
              tabIndex='1'
              onClick={(e) => favoriteSubmit(e, city)}
            >
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
    favoriteCity: state.locationReducer.favoriteCity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCity: bindActionCreators(addCity, dispatch),
    deleteCity: bindActionCreators(deleteCity, dispatch),
    favoriteCityWeather: bindActionCreators(favoriteCityWeather, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
