import Request from 'utils/request';

export const editUser = async data =>
  await Request({
    url: `/api/user`,
    method: 'PATCH',
    data,
  });

export const getUser = async () =>
  await Request({
    url: `/api/user`,
    method: 'GET',
  });
