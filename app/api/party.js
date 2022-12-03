import Request from 'utils/request';

export const getParties = async params =>
  await Request({
    url: '/api/party',
    method: 'GET',
    params,
  });

export const paginateParties = async params =>
  await Request({
    url: '/api/party/paginate',
    method: 'GET',
    params,
  });

export const getParty = async id =>
  await Request({
    url: `/api/party/${id}`,
    method: 'GET',
  });

export const addParty = async data =>
  await Request({
    url: '/api/party',
    method: 'POST',
    data,
  });

export const editParty = async (id, data) =>
  await Request({
    url: `/api/party/${id}`,
    method: 'PATCH',
    data,
  });

export const deleteParty = async id =>
  await Request({
    url: `/api/party/${id}`,
    method: 'DELETE',
  });
