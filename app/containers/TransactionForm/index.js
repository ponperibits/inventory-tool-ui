/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-underscore-dangle */
/**
 *
 * TransactionForm
 *
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';
import { Helmet } from 'react-helmet';
import {
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Button,
  Spinner,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import MBInput from 'components/MBInput';
import AlertPopupHandler from 'components/AlertPopup/AlertPopupHandler';
import PartyForm from 'containers/PartyForm';
import ProductForm from 'containers/ProductForm';
import RSelectAsync from 'components/RSelectAsync';
import ReactDatetime from 'react-datetime';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { CUSTOMER, SUPPLIER } from 'utils/appConstants';
import { get } from 'lodash';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function TransactionForm() {
  useInjectReducer({ key: 'transactionForm', reducer });
  const dispatch = useDispatch();
  const transactionFormInit = operations.transactionFormInit(dispatch);

  const [transactionType, setTransactionType] = useState('Purchase');

  const {
    transactionDate,
    notes,
    records,
    partyId,
    isEdit,
    isLoading,
    errorMessage,
    validations,
  } = useSelector(state => ({
    transactionDate: selectors.transactionDate(state),
    notes: selectors.notes(state),
    records: selectors.records(state),
    partyId: selectors.partyId(state),
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
    return () => transactionFormInit();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (isEdit) {
      // eslint-disable-next-line no-restricted-globals
      const { id } = qs.parse(location.search);
      dispatch(
        operations.onEdit(id, {
          transactionDate,
          notes,
          records,
          ...(transactionType === 'Sales'
            ? { customerId: partyId }
            : { supplierId: partyId }),
        }),
      );
    } else {
      dispatch(
        operations.onSubmit({
          transactionDate,
          notes,
          records,
          ...(transactionType === 'Sales'
            ? { customerId: partyId }
            : { supplierId: partyId }),
        }),
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
            <span className="btn-inner-text">Save Transaction</span>
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
          Save Transaction
        </Button>
        <Button
          className="ms-1"
          type="button"
          color="outline-primary"
          onClick={() => history.goBack()}
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

  const onAddNewParty = () => {
    AlertPopupHandler.openCustom({
      text: '',
      data: {},
      title: '',
      warning: true,
      customClass: 'text-xl',
      ChildTag: PartyForm,
      ChildProps: {
        isPopup: true,
        partyType: transactionType === 'Purchase' ? SUPPLIER : CUSTOMER,
        postAdd: () => {},
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const onAddNewProduct = () => {
    AlertPopupHandler.openCustom({
      text: '',
      data: {},
      title: '',
      warning: true,
      customClass: 'text-xl',
      ChildTag: ProductForm,
      ChildProps: {
        isPopup: true,
        postAdd: () => {},
      },
      showConfirm: false,
      showCancel: false,
    });
  };

  const getRecordInputComponent = () =>
    records.map((record, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Row className="d-flex align-items-center" key={index}>
        <Col>
          <FormGroup>
            <Label for="productId" sm={7}>
              Product {index + 1}
            </Label>
            <Col sm={12}>
              <RSelectAsync
                groupClassName="m-0"
                shouldInitialLoad
                error={get(validations, 'productId.0')}
                controlShouldRenderValue
                placeholder="Select Product"
                url="/api/product"
                name="productId"
                value={get(record, 'productId')}
                param="searchText"
                id="name"
                // refreshOptions={refreshOptions}
                getOptionLabel={option => option.name}
                getOptionValue={option => option._id}
                onChange={e => {
                  if (e) {
                    dispatch(
                      operations.changeRecord({
                        index,
                        payload: {
                          ...record,
                          productId: e,
                          amount:
                            get(
                              e,
                              transactionType === 'Purchase'
                                ? 'price'
                                : 'sellingPrice',
                              0,
                            ) * get(record, 'noOfUnits', 0),
                          prodUnitsBalance:
                            transactionType === 'Purchase'
                              ? get(e, 'noOfUnits', 0) +
                                get(record, 'noOfUnits', 0)
                              : get(e, 'noOfUnits', 0) -
                                get(record, 'noOfUnits', 0),
                        },
                      }),
                    );
                  } else {
                    dispatch(
                      operations.changeRecord({
                        index,
                        payload: {
                          ...record,
                          productId: undefined,
                          amount: 0,
                          prodUnitsBalance: 0,
                        },
                      }),
                    );
                  }
                }}
                noOptionsMessage={() => (
                  <div
                    role="button"
                    className="w-100 text-white bg-primary text-left p-3"
                    onClick={() => {
                      onAddNewProduct();
                    }}
                  >
                    + Add Product
                  </div>
                )}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="transactionDate" sm={7}>
              No Of Units
            </Label>
            <Col sm={12}>
              <MBInput
                type="number"
                name="transactionDate"
                placeholder="eg. 100, 200"
                value={get(record, 'noOfUnits')}
                error={validations}
                onChange={e => {
                  if (e) {
                    dispatch(
                      operations.changeRecord({
                        index,
                        payload: {
                          ...record,
                          noOfUnits: parseFloat(e),
                          amount:
                            get(
                              record,
                              transactionType === 'Purchase'
                                ? 'productId.price'
                                : 'productId.sellingPrice',
                              0,
                            ) * parseFloat(e),
                          prodUnitsBalance:
                            transactionType === 'Purchase'
                              ? parseFloat(e) +
                                get(record, 'productId.noOfUnits', 0)
                              : get(record, 'productId.noOfUnits', 0) -
                                parseFloat(e),
                        },
                      }),
                    );
                  }
                }}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="amount" sm={7}>
              Calculated Price
            </Label>
            <Col sm={12}>
              <MBInput
                type="number"
                disable
                name="amount"
                placeholder="0"
                value={get(record, 'amount', 0)}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="prodUnitsBalance" sm={7}>
              No of Units Left
            </Label>
            <Col sm={12}>
              <MBInput
                type="number"
                disable
                name="prodUnitsBalance"
                placeholder="0"
                value={get(record, 'prodUnitsBalance', 0)}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
    ));

  return (
    <div className="transactionForm mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Transaction Form</title>
        <meta name="description" content="Description of Transaction Form" />
      </Helmet>
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <h5 className="font-weight-bold">
            {isEdit ? 'Edit Transaction' : 'Add a Transaction'}
          </h5>
        </Col>
      </Row>
      <Form role="form" onSubmit={e => onSubmit(e)}>
        <FormGroup row>
          <Col sm={6}>
            {['Purchase', 'Sales'].map(item => (
              <Button
                disabled={isEdit}
                className="ms-1"
                color={item === transactionType ? 'primary' : 'outline-primary'}
                key={item}
                onClick={() => setTransactionType(item)}
              >
                {item}
              </Button>
            ))}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Transaction Date</Label>
          <Col sm={6}>
            <InputGroup className="input-group-alternative">
              <ReactDatetime
                inputProps={{
                  placeholder: 'Select Date',
                }}
                dateFormat="DD-MM-YYYY"
                timeFormat={false}
                onChange={e => dispatch(operations.changeDate(e))}
                value={transactionDate}
              />
              <InputGroupText>
                <i className="ni ni-calendar-grid-58" />
              </InputGroupText>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="partyId" sm={2}>
            {transactionType === 'Purchase' ? 'Supplier' : 'Customer'}
          </Label>
          <Col sm={6}>
            <RSelectAsync
              groupClassName="m-0"
              shouldInitialLoad
              error={get(validations, 'partyId')}
              controlShouldRenderValue
              placeholder={`Select ${
                transactionType === 'Purchase' ? 'Supplier' : 'Customer'
              }`}
              url={`/api/party?type=${
                transactionType === 'Purchase' ? 'Supplier' : 'Customer'
              }`}
              name="partyId"
              value={partyId}
              param="searchText"
              id="partyId"
              getOptionLabel={option => option.name}
              getOptionValue={option => option._id}
              onChange={e => {
                if (e) {
                  dispatch(operations.changeParty(e));
                } else {
                  dispatch(operations.changeParty());
                }
              }}
              noOptionsMessage={() => (
                <div
                  role="button"
                  className="w-100 text-white bg-primary text-left p-3"
                  onClick={() => {
                    onAddNewParty();
                  }}
                >
                  + Add{' '}
                  {transactionType === 'Purchase' ? 'Supplier' : 'Customer'}
                </div>
              )}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="notes" sm={2}>
            Notes
          </Label>
          <Col sm={6}>
            <MBInput
              type="textarea"
              name="notes"
              placeholder="Add Notes"
              value={notes}
              error={validations}
              onChange={e => dispatch(operations.changeNotes(e))}
            />
          </Col>
        </FormGroup>
        <Row>
          <Col className="fw-bold">Records: (Product Details)</Col>
        </Row>
        {getRecordInputComponent()}
        <Row>
          <Col className="text-end ms-auto">
            <Button
              onClick={() => dispatch(operations.addRecord())}
              color="outline text-primary fw-bold"
            >
              + Add New Record
            </Button>
          </Col>
        </Row>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
          <Col>{getErrorComponent()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default TransactionForm;
