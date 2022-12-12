/* eslint-disable react/prop-types */
/**
 *
 * ProductForm
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';
import { Form, FormGroup, Row, Col, Label, Button, Spinner } from 'reactstrap';
import GoBackHeader from 'components/GoBackHeader';
import MBInput from 'components/MBInput';
import { useCookies } from 'react-cookie';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ProductForm({
  isPopup = false,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  useInjectReducer({ key: 'productForm', reducer });
  const dispatch = useDispatch();
  const productFormInit = operations.productFormInit(dispatch);
  const [cookie] = useCookies(['user']);

  const {
    name,
    shortLabel,
    description,
    sku,
    price,
    sellingPrice,
    minStockWarning,
    isEdit,
    isLoading,
    errorMessage,
    validations,
  } = useSelector(state => ({
    name: selectors.name(state),
    shortLabel: selectors.shortLabel(state),
    description: selectors.description(state),
    sku: selectors.sku(state),
    price: selectors.price(state),
    sellingPrice: selectors.sellingPrice(state),
    minStockWarning: selectors.minStockWarning(state),
    isEdit: selectors.isEdit(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
  }));

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { id } = qs.parse(location.search);
    if (id) {
      dispatch(operations.fetchDetails(id));
    }
    return () => productFormInit();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (isEdit) {
      // eslint-disable-next-line no-restricted-globals
      const { id } = qs.parse(location.search);
      dispatch(
        operations.onEdit(id, {
          name,
          shortLabel,
          description,
          sku,
          price,
          sellingPrice,
          minStockWarning,
        }),
      );
    } else {
      dispatch(
        operations.onSubmit(
          {
            name,
            shortLabel,
            description,
            sku,
            price,
            sellingPrice,
            minStockWarning,
          },
          isPopup,
          onConfirm,
        ),
      );
    }
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <>
          <Button type="button" color="primary" className="btn-icon" disabled>
            <span className="btn-inner-icon">
              <Spinner size="sm" className="mr-2" />
            </span>{' '}
            <span className="btn-inner-text">Save Product</span>
          </Button>
          <Button
            className="ms-1"
            type="button"
            color="outline-primary"
            disabled
          >
            Cancel
          </Button>
        </>
      );
    return (
      <>
        <Button type="button" color="primary" onClick={e => onSubmit(e)}>
          Save Product
        </Button>
        <Button
          className="ms-1"
          type="button"
          color="outline-primary"
          onClick={() => (isPopup ? onCancel() : history.goBack())}
        >
          Cancel
        </Button>
      </>
    );
  };

  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-1 mt-3">
          <div className="text-center text-xs text-warning font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };

  return (
    <div
      className={classnames('productForm', {
        'mx-3 mx-md-4 ml-lg-7': !isPopup,
        'fs-6': isPopup,
      })}
    >
      <Helmet>
        <title>Product Form</title>
        <meta name="description" content="Description of Product Form" />
      </Helmet>
      {!isPopup && <GoBackHeader />}
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <h5 className="font-weight-bold">
            {isEdit ? 'Edit Product' : 'Add a Product'}
          </h5>
        </Col>
      </Row>
      <Form role="form" onSubmit={e => onSubmit(e)}>
        <FormGroup row>
          <Label for="name" sm={isPopup ? 4 : 2}>
            Name
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="text"
              name="name"
              placeholder="Product Name"
              error={validations}
              value={name}
              onChange={e => {
                dispatch(operations.changeName(e));
                if (!isEdit) {
                  dispatch(operations.changeShortLabel(e));
                }
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="shortLabel" sm={isPopup ? 4 : 2}>
            Short Label
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="text"
              name="shortLabel"
              placeholder="Product Label"
              error={validations}
              value={shortLabel}
              onChange={e => dispatch(operations.changeShortLabel(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={isPopup ? 4 : 2}>
            Description
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="textarea"
              name="description"
              placeholder="Product Description"
              error={validations}
              value={description}
              onChange={e => dispatch(operations.changeDescription(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="sku" sm={isPopup ? 4 : 2}>
            Sku
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="textarea"
              name="sku"
              placeholder="Product SKU"
              error={validations}
              value={sku}
              onChange={e => dispatch(operations.changeSku(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="price" sm={isPopup ? 4 : 2}>
            Price
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="number"
              name="price"
              placeholder="Product Price"
              error={validations}
              value={price}
              onChange={e => {
                dispatch(operations.changePrice(e));
                dispatch(
                  operations.changeSellingPrice(
                    e + e * selectors.getProfitPercent(cookie),
                  ),
                );
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="sellingPrice" sm={isPopup ? 4 : 2}>
            Selling Price
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="number"
              name="sellingPrice"
              placeholder="Product Selling Price"
              error={validations}
              value={sellingPrice}
              onChange={e => dispatch(operations.changeSellingPrice(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="minStockWarning" sm={isPopup ? 4 : 2}>
            Minimum Stock to Notify
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="number"
              name="minStockWarning"
              placeholder="Min Stock to Notify"
              error={validations}
              value={minStockWarning}
              onChange={e => dispatch(operations.changeMinStock(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default ProductForm;
