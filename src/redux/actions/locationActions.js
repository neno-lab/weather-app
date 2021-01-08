import { ADD_CITY, ADD_CITY_TO_URL, DELETE_CITY } from './locationTypes';

export const addCityToUrl = (location) => {
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
