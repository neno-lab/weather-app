import { combineReducers } from 'redux';
import { locationReducer } from './locationReducer';

const rootReducer = combineReducers({
  locationReducer: locationReducer,
});

export default rootReducer;
