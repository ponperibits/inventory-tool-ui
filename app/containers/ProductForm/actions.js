/*
 *
 * ProductForm actions
 *
 */

import history from 'utils/history';
import { get } from 'lodash';
import { addProduct, editProduct, getProduct } from 'api/product';
import NotificationHandler from 'components/Notifications/NotificationHandler';
import {
  INIT,
  CHANGE_NAME,
  CHANGE_DESCRIPTION,
  CHANGE_PRICE,
  CHANGE_SELLING_PRICE,
  CHANGE_MIN_STOCK,
  SET_PRODUCT_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from './constants';
import schema from './validations';

export const onSubmit = productDetails => async dispatch => {
  try {
    const isValid = schema.isValidSync(productDetails);
    if (!isValid) {
      const err = await schema.validate(productDetails).catch(error => error);
      dispatch(validationFailed(err));
      return;
    }
    dispatch(showLoading(true));

    await addProduct(productDetails);
    NotificationHandler.open({
      operation: 'success',
      title: 'Product added successfully',
    });
    history.push('/product');
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to add Product',
    });
  }
};

export const onEdit = (id, productDetails) => async dispatch => {
  try {
    const isValid = schema.isValidSync(productDetails);
    if (!isValid) {
      const err = await schema.validate(productDetails).catch(error => error);
      dispatch(validationFailed(err));
      return;
    }
    dispatch(showLoading(true));

    await editProduct(id, productDetails);
    NotificationHandler.open({
      operation: 'success',
      title: 'Product edited successfully',
    });
    history.push('/product');
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to edit Product',
    });
  }
};

export const fetchDetails = id => async dispatch => {
  try {
    const { data } = await getProduct(id);
    dispatch(setProductDetails(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch product details',
    });
  }
};

const setProductDetails = payload => ({
  type: SET_PRODUCT_DETAILS,
  payload,
});

const validationFailed = payload => ({
  type: VALIDATION_ERROR,
  payload,
});

const showLoading = payload => ({
  type: SHOW_LOADING,
  payload,
});

export const productFormInit = dispatch => () => {
  dispatch({
    type: INIT,
  });
};

export const changeName = payload => ({
  type: CHANGE_NAME,
  payload,
});

export const changeDescription = payload => ({
  type: CHANGE_DESCRIPTION,
  payload,
});

export const changePrice = payload => ({
  type: CHANGE_PRICE,
  payload,
});

export const changeSellingPrice = payload => ({
  type: CHANGE_SELLING_PRICE,
  payload,
});

export const changeMinStock = payload => ({
  type: CHANGE_MIN_STOCK,
  payload,
});
