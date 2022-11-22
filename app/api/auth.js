import Request from 'utils/request';

export const authenticateUser = async () =>
  await Request({
    url: '/api/auth',
    method: 'GET',
  });
