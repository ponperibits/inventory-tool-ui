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

import ExpenseManagement from 'containers/ExpenseManagement';
import ExpenseForm from 'containers/ExpenseForm';

import ReportManagement from 'containers/ReportManagement';

import UserSettings from 'containers/UserSettings';

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
    {
      path: '/expense/add',
      name: 'Expense Form',
      icon: 'ni ni-shop',
      component: ExpenseForm,
      layout: '',
    },
    {
      path: '/expense',
      name: 'Expense',
      icon: 'ni ni-shop',
      component: ExpenseManagement,
      layout: '',
    },
    {
      path: '/report',
      name: 'Report',
      icon: 'ni ni-shop',
      component: ReportManagement,
      layout: '',
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: 'ni ni-settings',
      component: UserSettings,
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
