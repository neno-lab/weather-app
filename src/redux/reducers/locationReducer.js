import { ADD_CITY } from '../actions/locationTypes';

const initialState = {
  city: '',
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      console.log('moj grad: ', action.payload.replace(/\s/g, '%20'));
      return {
        ...state,
        city: action.payload.replace(/\s/g, '%20'),
      };
    default:
      return state;
  }
};

export { locationReducer };
