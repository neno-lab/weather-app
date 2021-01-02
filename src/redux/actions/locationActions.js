import { ADD_CITY } from './locationTypes';

export const addCity = (location) => {
  console.log('akcija: ', location.city);
  return {
    type: ADD_CITY,
    payload: location.city,
  };
};
