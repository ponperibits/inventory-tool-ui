import Request from 'utils/request';

export const authenticateUser = async () =>
  await Request({
    url: '/api/auth',
    method: 'GET',
  });

export const loginUser = async data =>
  await Request({
    url: '/api/auth/login',
    method: 'POST',
    data,
  });

export const registerUser = async userDetails =>
  await Request({
    url: '/api/auth/register',
    method: 'POST',
    data: userDetails,
  });

export const verifyEmailCode = async code =>
  await Request({
    url: '/api/auth/verify-code',
    method: 'POST',
    data: code,
  });

export const resentEmailCode = async email =>
  await Request({
    url: '/api/auth/resend-verification',
    method: 'POST',
    data: { email },
  });

export const logout = async () =>
  await Request({
    url: '/api/auth/logout',
    method: 'GET',
  });
