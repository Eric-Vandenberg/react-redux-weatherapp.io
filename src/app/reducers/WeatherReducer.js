import { FETCH_WEATHER } from '../actions/fetchWeather';
import _ from 'lodash';

import { getConvertedTime } from '../utils/timeConverter';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      if (_.isUndefined(action.payload)) {
        return state;
      }

      const data = action.payload.data;

      if (action.payload.data.error) {
        return data;
      }

      if (data && _.isArray(data.daily.data)) {
        data.daily.data.map(function(day, i, days) {
          let amendIndex = false;

          if (days[0].hasOwnProperty('time') && data.currently.hasOwnProperty('time')) {
            amendIndex = getConvertedTime(days[0].time) !== getConvertedTime(data.currently.time);
          }
          if (amendIndex && i === 0) {
            days.splice(day, 1);
          }
        });
      }
      return _.isUndefined(action.payload) ? state : data;
    default:
      return state;
  }
}
