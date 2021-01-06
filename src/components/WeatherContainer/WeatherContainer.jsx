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
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;

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
    if (temp === undefined) {
      return '';
    }
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

  const [isSearched, setIsSearched] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isFavoriteCity, setIsFavoriteCity] = useState(false);
  const [isToday, setIsToday] = useState(false);
  const [isTomorrow, setIsTomorrow] = useState(false);
  const [isDayAfterTomorrow, setIsDayAfterTomorrow] = useState(false);

  const todaysDay = () => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let date = new Date();
    let today = days[date.getDay() + 2];

    return today;
  };

  const favoriteSubmit = (city) => {
    favoriteCityWeather(city);
    setIsSearched(false);
    setIsDeleted(false);
    setIsFavoriteCity(true);
    setIsToday(false);
    setIsTomorrow(false);
    setIsDayAfterTomorrow(false);
  };

  const todaySubmit = () => {
    setIsSearched(false);
    setIsDeleted(false);
    setIsFavoriteCity(false);
    setIsToday(true);
    setIsTomorrow(false);
    setIsDayAfterTomorrow(false);
  };

  const tomorrowSubmit = () => {
    setIsSearched(false);
    setIsDeleted(false);
    setIsFavoriteCity(false);
    setIsToday(false);
    setIsTomorrow(true);
    setIsDayAfterTomorrow(false);
  };

  const dayAfterTomorrowSubmit = () => {
    setIsSearched(false);
    setIsDeleted(false);
    setIsFavoriteCity(false);
    setIsToday(false);
    setIsTomorrow(false);
    setIsDayAfterTomorrow(true);
  };

  const handleDelete = (e, city) => {
    e.stopPropagation();
    setIsSearched(false);
    setIsDeleted(true);
    setIsFavoriteCity(false);
    setIsToday(false);
    setIsTomorrow(false);
    setIsDayAfterTomorrow(false);
    deleteCity(city);
    // favoriteCityWeather({ id: '', name: '', daily: [{ temp: undefined }] });
  };

  return (
    <>
      <div className='heart-img'></div>
      <div className='weather-container'>
        <div className='details-container'>
          <div className='top-details'>
            <div className='degree-location'>
              <div className='degree'>
                {isDeleted && ''}
                {(isFavoriteCity || isToday) &&
                  calculateAverageTemp(favoriteCity.daily[0].temp)}
                {isTomorrow && calculateAverageTemp(favoriteCity.daily[1].temp)}
                {isDayAfterTomorrow &&
                  calculateAverageTemp(favoriteCity.daily[2].temp)}
                &deg;
              </div>
              <div className='location'>
                {isDeleted && ''}
                {(isFavoriteCity ||
                  isToday ||
                  isTomorrow ||
                  isDayAfterTomorrow) &&
                  favoriteCity.name}
              </div>
            </div>
            <div className='weather-image'>
              {isDeleted && ''}
              {(isFavoriteCity || isToday) && (
                <img
                  src={`http://openweathermap.org/img/wn/${favoriteCity.daily[0].weather[0].icon}.png`}
                  alt={`${favoriteCity.daily[0].weather[0].icon}`}
                  style={{
                    width: '125px',
                    height: '125px',
                    background: 'none',
                  }}
                />
              )}
              {isTomorrow && (
                <img
                  src={`http://openweathermap.org/img/wn/${favoriteCity.daily[1].weather[0].icon}.png`}
                  alt={`${favoriteCity.daily[1].weather[0].icon}`}
                  style={{
                    width: '125px',
                    height: '125px',
                    background: 'none',
                  }}
                />
              )}
              {isDayAfterTomorrow && (
                <img
                  src={`http://openweathermap.org/img/wn/${favoriteCity.daily[2].weather[0].icon}.png`}
                  alt={`${favoriteCity.daily[2].weather[0].icon}`}
                  style={{
                    width: '125px',
                    height: '125px',
                    background: 'none',
                  }}
                />
              )}
            </div>
          </div>

          <div className='middle-details'>
            <p className='min'>
              Min. {isDeleted && ''}
              {(isFavoriteCity || isToday) &&
                (favoriteCity.daily[0].temp.min - 273).toFixed(0)}
              {isTomorrow && (favoriteCity.daily[1].temp.min - 273).toFixed(0)}
              {isDayAfterTomorrow &&
                (favoriteCity.daily[2].temp.min - 273).toFixed(0)}
              &deg;
            </p>
            <p className='max'>
              Max. {isDeleted && ''}
              {(isFavoriteCity || isToday) &&
                (favoriteCity.daily[0].temp.max - 273).toFixed(0)}
              {isTomorrow && (favoriteCity.daily[1].temp.max - 273).toFixed(0)}
              {isDayAfterTomorrow &&
                (favoriteCity.daily[2].temp.max - 273).toFixed(0)}
              &deg;
            </p>
          </div>

          <div className='bottom-details'>
            <ul className='days-container'>
              <li className='days-item'>
                <p
                  className='days-title'
                  tabIndex='1'
                  onClick={() => todaySubmit()}
                >
                  Today
                </p>
              </li>
              <li className='days-item'>
                <p
                  className='days-title'
                  tabIndex='1'
                  onClick={() => tomorrowSubmit()}
                >
                  Tomorrow
                </p>
              </li>
              <li className='days-item'>
                <p
                  className='days-title'
                  tabIndex='1'
                  onClick={() => dayAfterTomorrowSubmit()}
                >
                  {todaysDay()}
                </p>
              </li>
            </ul>
            <div className='sunrise-sunset'>
              <div className='sunrise'>
                <p className='sunrise-title'>SUNRISE</p>
                <p className='sunrise-details'>
                  {isDeleted && ''}
                  {(isFavoriteCity || isToday) &&
                    calculateSunrise(favoriteCity.daily[0].sunrise)}
                  {isTomorrow &&
                    calculateSunrise(favoriteCity.daily[1].sunrise)}
                  {isDayAfterTomorrow &&
                    calculateSunrise(favoriteCity.daily[2].sunrise)}
                </p>
              </div>
              <div className='sunset'>
                <p className='sunset-title'>SUNSET</p>
                <p className='sunset-details'>
                  {isDeleted && ''}
                  {(isFavoriteCity || isToday) &&
                    calculateSunset(favoriteCity.daily[0].sunset)}
                  {isTomorrow && calculateSunset(favoriteCity.daily[1].sunset)}
                  {isDayAfterTomorrow &&
                    calculateSunset(favoriteCity.daily[2].sunset)}
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
                onClick={() => favoriteSubmit(city)}
              >
                <div className='city'>{city.name}</div>
                <div
                  className='cancel-btn'
                  onClick={(e) => handleDelete(e, city.id)}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
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
