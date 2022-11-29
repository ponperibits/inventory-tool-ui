/**
 *
 * ExpenseForm
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';
import { Helmet } from 'react-helmet';
import {
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Label,
  Button,
  Spinner,
} from 'reactstrap';
import GoBackHeader from 'components/GoBackHeader';
import MBInput from 'components/MBInput';
import ReactDatetime from 'react-datetime';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { EXPENSE, INCOME } from 'utils/appConstants';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ExpenseForm() {
  useInjectReducer({ key: 'expenseForm', reducer });
  const dispatch = useDispatch();
  const expenseFormInit = operations.expenseFormInit(dispatch);

  const {
    transactionDate,
    title,
    amount,
    type,
    notes,
    isEdit,
    isLoading,
    errorMessage,
    validations,
  } = useSelector(state => ({
    transactionDate: selectors.transactionDate(state),
    title: selectors.title(state),
    amount: selectors.amount(state),
    type: selectors.type(state),
    notes: selectors.notes(state),
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

    return () => expenseFormInit();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (isEdit) {
      // eslint-disable-next-line no-restricted-globals
      const { id } = qs.parse(location.search);
      dispatch(
        operations.onEdit(id, {
          transactionDate: transactionDate.valueOf(),
          title,
          amount,
          type,
          notes,
        }),
      );
    } else {
      dispatch(
        operations.onSubmit({
          transactionDate: transactionDate.valueOf(),
          title,
          amount,
          type,
          notes,
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
            {isEdit ? 'Save / Edit Expense' : 'Add Expense'}
          </span>
        </Button>
      );
    return (
      <>
        <Button type="button" color="primary" onClick={e => onSubmit(e)}>
          {isEdit ? 'Save / Edit Expense' : 'Add Expense'}
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

  return (
    <div className="expenseForm mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Expense Form</title>
        <meta name="description" content="Description of Expense Form" />
      </Helmet>
      <GoBackHeader />
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <h5 className="font-weight-bold">
            {isEdit ? 'Edit Expense' : 'Add a Expense'}
          </h5>
        </Col>
      </Row>
      <Form role="form" onSubmit={e => onSubmit(e)}>
        <FormGroup row>
          <Label for="type" sm={2}>
            Type
          </Label>
          <Col sm={6}>
            {[EXPENSE, INCOME].map(item => (
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
          <Label for="transactionDate" sm={2}>
            Transaction Date
          </Label>
          <Col sm={6}>
            <InputGroup className="input-group-alternative">
              <ReactDatetime
                inputProps={{
                  placeholder: 'Select Date',
                  className: 'form-control',
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
          <Label for="title" sm={2}>
            Title
          </Label>
          <Col sm={6}>
            <MBInput
              type="text"
              name="title"
              placeholder="eg. Travel Expense"
              value={title}
              onChange={e => dispatch(operations.changeTitle(e))}
              error={validations}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="amount" sm={2}>
            Amount
          </Label>
          <Col sm={6}>
            <MBInput
              type="number"
              name="amount"
              placeholder="eg. 1000"
              value={amount}
              onChange={e => dispatch(operations.changeAmount(e))}
              error={validations}
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
              placeholder="eg. Travel Expense"
              value={notes}
              onChange={e => dispatch(operations.changeNotes(e))}
              error={validations}
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

export default ExpenseForm;
