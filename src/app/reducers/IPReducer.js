import { PRELOAD_WEATHER } from '../actions/fetchIP';
import _ from 'lodash';

export default function (state = {}, action) {
  switch (action.type) {
    case PRELOAD_WEATHER:
      return _.isUndefined(action.payload) ? state : action.payload.data;
    default:
      return state;
  }
}
