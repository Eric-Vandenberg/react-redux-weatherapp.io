import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import IPReducer from './IPReducer';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  ip: IPReducer
});

export default rootReducer;
