import Request from 'utils/request';

export const getProducts = async params =>
  await Request({
    url: '/api/product',
    method: 'GET',
    params,
  });

export const getProduct = async id =>
  await Request({
    url: `/api/product/${id}`,
    method: 'GET',
  });

export const addProduct = async data =>
  await Request({
    url: '/api/product',
    method: 'POST',
    data,
  });

export const editProduct = async (id, data) =>
  await Request({
    url: `/api/product/${id}`,
    method: 'PATCH',
    data,
  });
