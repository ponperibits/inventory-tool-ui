import Login from 'containers/Login';
import Register from 'containers/Register';

import Dashboard from 'containers/Dashboard';

import PartyManagement from 'containers/PartyManagement';

const routes = {
  home: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: 'ni ni-shop',
      component: Dashboard,
      layout: '',
    },
    {
      path: '/party',
      name: 'Party',
      icon: 'ni ni-shop',
      component: PartyManagement,
      layout: '',
    },
  ],
  auth: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      layout: '/auth',
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      layout: '/auth',
    },
  ],
};

export default routes;
