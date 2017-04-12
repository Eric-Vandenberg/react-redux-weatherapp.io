import moment from 'moment';

export const getConvertedTime = (timestamp) => {
  return moment.unix(timestamp).format('MM-DD-YYYY');
};