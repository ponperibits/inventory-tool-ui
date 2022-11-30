/* eslint-disable react/prop-types */
/**
 *
 * PartyForm
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
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { CUSTOMER, SUPPLIER } from 'utils/appConstants';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function PartyForm({
  isPopup = false,
  partyType = SUPPLIER,
  onConfirm = () => {},
  onCancel = () => {},
}) {
  useInjectReducer({ key: 'partyForm', reducer });
  const dispatch = useDispatch();
  const partyFormInit = operations.partyFormInit(dispatch);

  const {
    name,
    phone,
    type,
    gstNumber,
    panNumber,
    category,
    address,
    isEdit,
    isLoading,
    errorMessage,
    validations,
  } = useSelector(state => ({
    name: selectors.name(state),
    phone: selectors.phone(state),
    type: selectors.type(state),
    gstNumber: selectors.gstNumber(state),
    panNumber: selectors.panNumber(state),
    category: selectors.category(state),
    address: selectors.address(state),
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

    if (partyType) {
      dispatch(operations.changeType(partyType));
    }
    return () => partyFormInit();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (isEdit) {
      // eslint-disable-next-line no-restricted-globals
      const { id } = qs.parse(location.search);
      dispatch(
        operations.onEdit(id, {
          name,
          phone,
          type,
          gstNumber,
          panNumber,
          category,
          address,
        }),
      );
    } else {
      dispatch(
        operations.onSubmit(
          {
            name,
            phone,
            type,
            gstNumber,
            panNumber,
            category,
            address,
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
        <Button type="button" color="primary" className="btn-icon" disabled>
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>{' '}
          <span className="btn-inner-text">
            {isEdit ? 'Save / Edit Party' : 'Add Party'}
          </span>
        </Button>
      );
    return (
      <>
        <Button type="button" color="primary" onClick={e => onSubmit(e)}>
          {isEdit ? 'Save / Edit Party' : 'Add Party'}
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
      className={classnames('partyForm', {
        'mx-3 mx-md-4 ml-lg-7': !isPopup,
        'fs-6': isPopup,
      })}
    >
      <Helmet>
        <title>Party Form</title>
        <meta name="description" content="Description of Party Form" />
      </Helmet>
      {!isPopup && <GoBackHeader />}
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <h5 className="font-weight-bold">
            {isEdit ? 'Edit Party' : 'Add a Party'}
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
              placeholder="John Doe"
              error={validations}
              value={name}
              onChange={e => dispatch(operations.changeName(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phone" sm={isPopup ? 4 : 2}>
            Phone
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="text"
              name="phone"
              placeholder="1234567890"
              error={validations}
              value={phone}
              onChange={e => dispatch(operations.changePhone(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="type" sm={isPopup ? 4 : 2}>
            Type
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            {[SUPPLIER, CUSTOMER].map(item => (
              <Button
                className="ms-1"
                color={item === type ? 'primary' : 'outline-primary'}
                key={item}
                onClick={() => dispatch(operations.changeType(item))}
              >
                {item}
              </Button>
            ))}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="gstNumber" sm={isPopup ? 4 : 2}>
            GST Number
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              error={validations}
              value={gstNumber}
              onChange={e => dispatch(operations.changeGst(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="panNumber" sm={isPopup ? 4 : 2}>
            PAN Number
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="text"
              name="panNumber"
              placeholder="PAN Number"
              error={validations}
              value={panNumber}
              onChange={e => dispatch(operations.changePan(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="category" sm={isPopup ? 4 : 2}>
            Category
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="text"
              name="category"
              placeholder="Category"
              error={validations}
              value={category}
              onChange={e => dispatch(operations.changeCategory(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="address" sm={isPopup ? 4 : 2}>
            Address
          </Label>
          <Col sm={isPopup ? 8 : 6}>
            <MBInput
              type="textarea"
              name="address"
              placeholder="Address"
              error={validations}
              value={address}
              onChange={e => dispatch(operations.changeAddress(e))}
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

export default PartyForm;
