import Login from 'containers/Login';
import Register from 'containers/Register';

import Dashboard from 'containers/Dashboard';

import PartyManagement from 'containers/PartyManagement';
import PartyForm from 'containers/PartyForm';
import ProductManagement from 'containers/ProductManagement';
import ProductForm from 'containers/ProductForm';

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
      path: '/party/add',
      name: 'Party',
      component: PartyForm,
      layout: '',
    },
    {
      path: '/party',
      name: 'Party',
      icon: 'ni ni-shop',
      component: PartyManagement,
      layout: '',
    },
    {
      path: '/product/add',
      name: 'Product',
      component: ProductForm,
      layout: '',
    },
    {
      path: '/product',
      name: 'Product',
      icon: 'ni ni-shop',
      component: ProductManagement,
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
