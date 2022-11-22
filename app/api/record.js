import Request from 'utils/request';

export const getRecords = async params =>
  await Request({
    url: '/api/record',
    method: 'GET',
    params,
  });

export const getRecord = async id =>
  await Request({
    url: `/api/record/${id}`,
    method: 'GET',
  });
