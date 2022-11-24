import moment from 'moment-timezone';

const DATE_FORMAT = 'DD MMM YYYY';
const DATE_AND_TIME_FORMAT = 'DD MMM YYYY / hh:mm A';

export const parseDateTime = dateTime =>
  moment(dateTime).format(DATE_AND_TIME_FORMAT);
