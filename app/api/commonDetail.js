import Request from 'utils/request';

export const getDashboardStats = async params =>
  await Request({
    url: '/api/commonDetail/dashboardStats',
    method: 'GET',
    params,
  });
