import {
  ADD_CITY,
  ADD_CITY_TO_URL,
  DELETE_CITY,
  FAVORITE_CITY_WEATHER,
} from './locationTypes';

export const addCityToUrl = (location) => {
  console.log('akcija: ', location.city);
  return {
    type: ADD_CITY_TO_URL,
    payload: location.city,
  };
};

export const addCity = (city) => {
  return {
    type: ADD_CITY,
    payload: city,
  };
};

export const deleteCity = (city) => {
  return {
    type: DELETE_CITY,
    payload: city,
  };
};

export const favoriteCityWeather = (city) => {
  return {
    type: FAVORITE_CITY_WEATHER,
    payload: city,
  };
};
