import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './WeatherContainer.scss';
import {
  deleteCity,
  favoriteCityWeather,
} from '../../redux/actions/locationActions';

const WeatherContainer = ({
  cities,
  deleteCity,
  favoriteCityWeather,
  favoriteCity,
}) => {
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

  const [index, setIndex] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isSearched, setIsSearched] = useState(true);
  const [fav, setFav] = useState({});

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

  const searchedCity = () => {
    console.log('Hladno je.', cities);
    let addedCity = cities[cities.length - 1].daily[0];
    let todaysTemp = calculateAverageTemp(addedCity.temp);
    let min = (addedCity.temp.min - 273).toFixed(0);
    let max = (addedCity.temp.max - 273).toFixed(0);
    let todaysSunrise = calculateSunrise(addedCity.sunrise);
    let todaysSunset = calculateSunrise(addedCity.sunset);
    let img = (
      <img
        src={`http://openweathermap.org/img/wn/${addedCity.weather[0].icon}.png`}
        alt={`${addedCity.weather[0].icon}`}
        style={{
          width: '125px',
          height: '125px',
          background: 'none',
        }}
      />
    );
    let newProps = {
      id: addedCity.id,
      name: cities[cities.length - 1].name,
      temp: todaysTemp,
      min: min,
      max: max,
      sunrise: todaysSunrise,
      sunset: todaysSunset,
      img: img,
    };
    return newProps;
  };

  const handleDay = (i) => {
    setIndex(i);
  };

  const handleDelete = (e, city) => {
    e.stopPropagation();
    // setIsSearched(false);
    deleteCity(city);
  };

  const handleFavorite = (e, city) => {
    favoriteCityWeather(city);
    setIsSearched(false);
    setIsTriggered(true);
  };
  console.log('fav: ', favoriteCity);
  return cities.length === 0 ? (
    <h1>Loading</h1>
  ) : (
    <>
      <div className='heart-img'></div>
      <div className='weather-container'>
        <div className='details-container'>
          <div className='top-details'>
            <div className='degree-location'>
              <div className='degree'>
                {isSearched && searchedCity().temp}
                {/*isTriggered &&
                Object.keys(favoriteCity).length === 0 &&
                favoriteCity.constructor === Object
                  ? calculateAverageTemp(
                      cities[cities.length - 1].daily[index].temp
                    )
                  : calculateAverageTemp(favoriteCity.daily[0].temp)} */}
                &deg;
              </div>
              <div className='location'>
                {/* {isSearched && searchedCity().name}
                {isTriggered &&
                Object.keys(favoriteCity).length === 0 &&
                favoriteCity.constructor === Object
                  ? cities[cities.length - 1].name
                  : 'favoriteCity.name'} */}
              </div>
            </div>
            <div className='weather-image'>
              {/* {isSearched && handleSubmit().img} */}
            </div>
          </div>

          <div className='middle-details'>
            <p className='min'>
              {/* Min. {isSearched && handleSubmit().min} */}
              &deg;
            </p>
            <p className='max'>
              {/* Max. {isSearched && handleSubmit().max} */}
              &deg;
            </p>
          </div>

          <div className='bottom-details'>
            <ul className='days-container'>
              <li className='days-item'>
                <p
                  className='days-title'
                  tabIndex='1'
                  onClick={() => handleDay(0)}
                >
                  Today
                </p>
              </li>
              <li className='days-item'>
                <p
                  className='days-title'
                  tabIndex='1'
                  onClick={() => handleDay(1)}
                >
                  Tomorrow
                </p>
              </li>
              <li className='days-item'>
                <p
                  className='days-title'
                  tabIndex='1'
                  onClick={() => handleDay(2)}
                >
                  {todaysDay()}
                </p>
              </li>
            </ul>
            <div className='sunrise-sunset'>
              <div className='sunrise'>
                <p className='sunrise-title'>SUNRISE</p>
                <p className='sunrise-details'>
                  {/* {isSearched && handleSubmit().sunrise} */}
                </p>
              </div>
              <div className='sunset'>
                <p className='sunset-title'>SUNSET</p>
                <p className='sunset-details'>
                  {/* {isSearched && handleSubmit().sunset} */}
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
                onClick={(e) => handleFavorite(e, city)}
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
    deleteCity: bindActionCreators(deleteCity, dispatch),
    favoriteCityWeather: bindActionCreators(favoriteCityWeather, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
