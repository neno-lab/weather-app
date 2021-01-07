import React, { useEffect } from 'react';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import WeatherContainer from '../components/WeatherContainer/WeatherContainer';
import Header from '../components/Header/Header';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { addCity } from '../redux/actions/locationActions';

const Home = ({ cities, city, addCity }) => {
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const fetchData = async () => {
      try {
        if (city !== '') {
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
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [city, addCity]);

  return (
    <>
      <Header />
      {cities.length === 0 ? <DefaultContainer /> : <WeatherContainer />}
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
    addCity: bindActionCreators(addCity, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
