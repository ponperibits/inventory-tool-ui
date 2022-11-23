import { logout } from 'api/auth';
import history from '../../utils/history';

export const onLogout = () => async () => {
  try {
    await logout();
    history.push('/');
    return;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};
