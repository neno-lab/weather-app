import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './WeatherContainer.scss';
import { deleteCity } from '../../redux/actions/locationActions';
import AddLocation from '../AddLocation/AddLocation';

const WeatherContainer = ({ deleteCity, cities }) => {
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
    let formattedTime = 'At ' + hours + ':' + minutes + ' ' + amPm;

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
    let formattedTime = 'At ' + hours + ':' + minutes + ' ' + amPm;

    return formattedTime;
  };

  const [index, setIndex] = useState(0);
  const [isTriggered, setIsTriggered] = useState(false);
  const [fav, setFav] = useState({});
  const [isToday, setIsToday] = useState(true);
  const [isTomorrow, setIsTomorrow] = useState(false);
  const [isDayAfterTomorrow, setIsDayAfterTomorrow] = useState(false);
  const [isOpenSection, setIsOpenSection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemClicked, setIsItemClicked] = useState('');

  const todaysDay = () => {
    let date = new Date();
    let day = date.getDay();
    let today = '';
    switch (day) {
      case 0:
        today = 'Sunday';
        break;
      case 1:
        today = 'Monday';
        break;
      case 2:
        today = 'Tuesday';
        break;
      case 3:
        today = 'Wednesday';
        break;
      case 4:
        today = 'Thursday';
        break;
      case 5:
        today = 'Friday';
        break;
      case 6:
        today = 'Saturday';
        break;
      default:
        today = '';
    }

    return today;
  };

  const handleDay = (i) => {
    switch (i) {
      case 0:
        setIsToday(true);
        setIsTomorrow(false);
        setIsDayAfterTomorrow(false);
        break;
      case 1:
        setIsToday(false);
        setIsTomorrow(true);
        setIsDayAfterTomorrow(false);
        break;
      case 2:
        setIsToday(false);
        setIsTomorrow(false);
        setIsDayAfterTomorrow(true);
        break;
      default:
        break;
    }
    setIndex(i);
  };

  const handleDelete = (e, city) => {
    e.stopPropagation();
    deleteCity(city);
  };

  const handleFavorite = (city) => {
    setIsItemClicked(city.id);
    setIsTriggered(true);
    setFav(city);
    setIsOpenSection(false);
  };

  const onClickHeart = (e) => {
    e.preventDefault();
    setIsOpenSection(true);
  };

  const closeSection = (e) => {
    e.preventDefault();
    setIsOpenSection(false);
  };

  const openModal = () => {
    setIsOpenSection(false);
    setIsModalOpen(true);
  };

  return cities.length === 0 ? (
    <h1>Loading</h1>
  ) : (
    <>
      <div className='weather-container'>
        <div className='details-container'>
          <div className='top-details'>
            <div className='degree-location'>
              <div className='degree'>
                {isTriggered
                  ? calculateAverageTemp(fav.daily[index].temp)
                  : calculateAverageTemp(
                      cities[cities.length - 1].daily[index].temp
                    )}
                &deg;
              </div>
              <div className='location'>
                {isTriggered ? fav.name : cities[cities.length - 1].name}
              </div>
            </div>
            <div className='weather-image'>
              {isTriggered ? (
                <img
                  src={`http://openweathermap.org/img/wn/${fav.daily[index].weather[0].icon}.png`}
                  alt={`${fav.daily[index].weather[0].icon}`}
                  style={{
                    width: '125px',
                    height: '125px',
                    background: 'none',
                  }}
                />
              ) : (
                <img
                  src={`http://openweathermap.org/img/wn/${
                    cities[cities.length - 1].daily[index].weather[0].icon
                  }.png`}
                  alt={`${
                    cities[cities.length - 1].daily[index].weather[0].icon
                  }`}
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
              Min.{' '}
              {isTriggered
                ? (fav.daily[index].temp.min - 273).toFixed(0)
                : (
                    cities[cities.length - 1].daily[index].temp.min - 273
                  ).toFixed(0)}
              &deg;
            </p>
            <p className='max'>
              Max.{' '}
              {isTriggered
                ? (fav.daily[index].temp.max - 273).toFixed(0)
                : (
                    cities[cities.length - 1].daily[index].temp.max - 273
                  ).toFixed(0)}
              &deg;
            </p>
          </div>

          <div className='bottom-details'>
            <ul className='days-container'>
              <li className={isToday ? 'days-item active' : 'days-item'}>
                <p className='days-title' onClick={() => handleDay(0)}>
                  Today
                </p>
              </li>
              <li className={isTomorrow ? 'days-item active' : 'days-item'}>
                <p className='days-title' onClick={() => handleDay(1)}>
                  Tomorrow
                </p>
              </li>
              <li
                className={
                  isDayAfterTomorrow ? 'days-item active' : 'days-item'
                }
              >
                <p className='days-title' onClick={() => handleDay(2)}>
                  {todaysDay()}
                </p>
              </li>
            </ul>
            <div className='sunrise-sunset'>
              <div className='sunrise'>
                <p className='sunrise-title'>SUNRISE</p>
                <p className='sunrise-details'>
                  {isTriggered
                    ? calculateSunrise(fav.daily[index].sunrise)
                    : calculateSunrise(
                        cities[cities.length - 1].daily[index].sunrise
                      )}
                </p>
              </div>
              <div className='sunset'>
                <p className='sunset-title'>SUNSET</p>
                <p className='sunset-details'>
                  {isTriggered
                    ? calculateSunset(fav.daily[index].sunset)
                    : calculateSunset(
                        cities[cities.length - 1].daily[index].sunset
                      )}
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
                onClick={() => handleFavorite(city)}
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

        {/* changing weather app title and adding heart btn */}
        <p className='weather-title-mobile'>
          {isTriggered ? fav.name : cities[cities.length - 1].name}
        </p>
        <button className='heart-btn' onClick={onClickHeart}></button>

        {isOpenSection && (
          <div className='select-container'>
            <div className='select-section'>
              <button className='cancel-btn' onClick={closeSection}></button>
              <h2>Cities</h2>
              <ul>
                {cities.map((city) => (
                  <li
                    key={city.id}
                    onClick={() => handleFavorite(city)}
                    className={
                      isItemClicked === city.id ? 'item active-item' : 'item'
                    }
                  >
                    <div className='city'>{city.name}</div>
                    <button
                      className='delete-btn'
                      onClick={(e) => handleDelete(e, city.id)}
                    ></button>
                  </li>
                ))}
              </ul>
              <button className='add-location' onClick={openModal}>
                Add location
              </button>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <AddLocation open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
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
    deleteCity: bindActionCreators(deleteCity, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
