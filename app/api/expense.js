import Request from 'utils/request';

export const getExpenses = async params =>
  await Request({
    url: '/api/expense',
    method: 'GET',
    params,
  });

export const paginateExpenses = async params =>
  await Request({
    url: '/api/expense/paginate',
    method: 'GET',
    params,
  });

export const getExpense = async id =>
  await Request({
    url: `/api/expense/${id}`,
    method: 'GET',
  });

export const addExpense = async data =>
  await Request({
    url: '/api/expense',
    method: 'POST',
    data,
  });

export const editExpense = async (id, data) =>
  await Request({
    url: `/api/expense/${id}`,
    method: 'PATCH',
    data,
  });

export const deleteExpense = async id =>
  await Request({
    url: `/api/expense/${id}`,
    method: 'DELETE',
  });
