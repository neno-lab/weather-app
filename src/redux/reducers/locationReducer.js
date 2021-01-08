import {
  ADD_CITY,
  ADD_CITY_TO_URL,
  DELETE_CITY,
} from '../actions/locationTypes';

const initialState = {
  city: '',
  cities: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY_TO_URL:
      return {
        ...state,
        city: action.payload.replace(/\s/g, '%20'),
      };

    case ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };

    case DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      return state;
  }
};

export { locationReducer };
