/**
 *
 * ProductForm
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';
import { Helmet } from 'react-helmet';
import { Form, FormGroup, Row, Col, Label, Button, Spinner } from 'reactstrap';
import MBInput from 'components/MBInput';
import MBSelect from 'components/MBSelect';
import { SUPPORTED_CURRENCIES } from 'utils/appConstants';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ProductForm() {
  useInjectReducer({ key: 'productForm', reducer });
  const dispatch = useDispatch();
  const productFormInit = operations.productFormInit(dispatch);

  const {
    name,
    description,
    price,
    sellingPrice,
    currency,
    noOfUnits,
    supplierId,
    availableSuppliers,
    isEdit,
    isLoading,
    errorMessage,
    validations,
  } = useSelector(state => ({
    name: selectors.name(state),
    description: selectors.description(state),
    price: selectors.price(state),
    sellingPrice: selectors.sellingPrice(state),
    currency: selectors.currency(state),
    noOfUnits: selectors.noOfUnits(state),
    supplierId: selectors.supplierId(state),
    availableSuppliers: selectors.availableSuppliers(state),
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
    dispatch(operations.fetchAvailableSuppliers());
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
          description,
          price,
          sellingPrice,
          currency,
          noOfUnits,
          supplierId,
        }),
      );
    } else {
      dispatch(
        operations.onSubmit({
          name,
          description,
          price,
          sellingPrice,
          currency,
          noOfUnits,
          supplierId,
        }),
      );
    }
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <Button type="button" color="primary" className="btn-icon" disabled>
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>{' '}
          <span className="btn-inner-text">
            {isEdit ? 'Save / Edit Product' : 'Add Product'}
          </span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={e => onSubmit(e)}>
        {isEdit ? 'Save / Edit Product' : 'Add Product'}
      </Button>
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
    <div className="productForm mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Product Form</title>
        <meta name="description" content="Description of Product Form" />
      </Helmet>{' '}
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <h5 className="font-weight-bold">
            {isEdit ? 'Edit Product' : 'Add a Product'}
          </h5>
        </Col>
      </Row>
      <Form role="form" onSubmit={e => onSubmit(e)}>
        <FormGroup row>
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col sm={6}>
            <MBInput
              type="text"
              name="name"
              placeholder="Product Name"
              error={validations}
              value={name}
              onChange={e => dispatch(operations.changeName(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>
            Description
          </Label>
          <Col sm={6}>
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
          <Label for="price" sm={2}>
            Price
          </Label>
          <Col sm={6}>
            <MBInput
              type="number"
              name="price"
              placeholder="Product Price"
              error={validations}
              value={price}
              onChange={e => dispatch(operations.changePrice(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="sellingPrice" sm={2}>
            Selling Price
          </Label>
          <Col sm={6}>
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
          <Label for="currency" sm={2}>
            Currency
          </Label>
          <Col sm={6}>
            <MBSelect
              className="basic-multi-select w-100"
              data={SUPPORTED_CURRENCIES.map(curr => ({
                id: curr,
                text: curr,
              }))}
              classNamePrefix="select"
              name="currency"
              placeholder="Select Currency"
              value={currency}
              error={validations}
              onChange={e => dispatch(operations.changeCurrency(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="noOfUnits" sm={2}>
            No of Units
          </Label>
          <Col sm={6}>
            <MBInput
              type="number"
              name="noOfUnits"
              placeholder="Product No of Units"
              error={validations}
              value={noOfUnits}
              onChange={e => dispatch(operations.changeNoOfUnits(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="supplierId" sm={2}>
            Supplier
          </Label>
          <Col sm={6}>
            <MBSelect
              className="basic-multi-select w-100"
              data={availableSuppliers.map(({ name: supplierName, _id }) => ({
                id: _id,
                text: supplierName,
              }))}
              classNamePrefix="select"
              placeholder="Select Supplier"
              value={supplierId}
              error={validations}
              name="supplierId"
              onChange={e => dispatch(operations.changeSupplier(e))}
              getOptionLabel={option => option.name}
              // eslint-disable-next-line no-underscore-dangle
              getOptionValue={option => option._id}
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