import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './WeatherContainer.scss';

const WeatherContainer = ({ city }) => {
  const API_KEY = 'e36ca5c9259a10df068bc915c2f2b4a4';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getCity = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        console.log(getCity);
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
  }, [city]);

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
          <div className='days'>
            <p className='days-title'>today, tomorrow, wednesday</p>
          </div>
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
        <ul>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
          <li>
            <div className='city'>Split, Croatia</div>
            <div className='cancel-btn'></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    city: state.locationReducer.city,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectRestaurant: bindActionCreators(selectRestaurant, dispatch),
//   };
// };

export default connect(mapStateToProps, null)(WeatherContainer);
