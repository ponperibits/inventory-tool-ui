import Login from 'containers/Login';
import Register from 'containers/Register';

import Dashboard from 'containers/Dashboard';

import PartyDetails from 'containers/PartyDetails';
import PartyManagement from 'containers/PartyManagement';
import PartyForm from 'containers/PartyForm';

import ProductDetails from 'containers/ProductDetails';
import ProductManagement from 'containers/ProductManagement';
import ProductForm from 'containers/ProductForm';

import TransactionManagement from 'containers/TransactionManagement';
import TransactionForm from 'containers/TransactionForm';

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
      name: 'Party Form',
      component: PartyForm,
      layout: '',
    },
    {
      path: '/party/view',
      name: 'Party Details',
      component: PartyDetails,
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
      path: '/product/view',
      name: 'Product Details',
      component: ProductDetails,
      layout: '',
    },
    {
      path: '/product/add',
      name: 'Product Form',
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
    {
      path: '/transaction/add',
      name: 'Transaction Form',
      icon: 'ni ni-shop',
      component: TransactionForm,
      layout: '',
    },
    {
      path: '/transaction',
      name: 'Transaction',
      icon: 'ni ni-shop',
      component: TransactionManagement,
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
