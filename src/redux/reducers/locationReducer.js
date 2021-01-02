import { ADD_CITY } from '../actions/locationTypes';

const initialState = {
  city: '',
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      console.log('moj grad: ', action.payload);
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};

export { locationReducer };
