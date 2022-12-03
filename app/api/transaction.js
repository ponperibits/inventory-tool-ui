import Request from 'utils/request';

export const getTransactions = async params =>
  await Request({
    url: '/api/transaction',
    method: 'GET',
    params,
  });

export const getTransaction = async id =>
  await Request({
    url: `/api/transaction/${id}`,
    method: 'GET',
  });

export const addTransaction = async data =>
  await Request({
    url: '/api/transaction',
    method: 'POST',
    data,
  });

export const editTransaction = async (id, data) =>
  await Request({
    url: `/api/transaction/${id}`,
    method: 'PATCH',
    data,
  });

export const deleteTransaction = async id =>
  await Request({
    url: `/api/transaction/${id}`,
    method: 'DELETE',
  });
