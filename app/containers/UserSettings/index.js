/**
 *
 * UserSettings
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Form, FormGroup, Row, Col, Label, Button, Spinner } from 'reactstrap';
import GoBackHeader from 'components/GoBackHeader';
import MBInput from 'components/MBInput';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function UserSettings() {
  useInjectReducer({ key: 'userSettings', reducer });
  const dispatch = useDispatch();
  const userSettingsInit = operations.userSettingsInit(dispatch);

  const { currency, profitPercent, isLoading, validations } = useSelector(
    state => ({
      currency: selectors.currency(state),
      profitPercent: selectors.profitPercent(state),
      isLoading: selectors.isLoading(state),
      validations: selectors.validations(state),
    }),
  );

  useEffect(() => {
    dispatch(operations.fetchDetails());

    return () => userSettingsInit();
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    dispatch(operations.onEdit({ currency, profitPercent }));
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <Button type="button" color="primary" className="btn-icon" disabled>
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>{' '}
          <span className="btn-inner-text">Save Settings</span>
        </Button>
      );
    return (
      <Button type="button" color="primary" onClick={e => onSubmit(e)}>
        Save Settings
      </Button>
    );
  };

  return (
    <div className="partyForm mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>User Settings</title>
        <meta name="description" content="Description of User Settings" />
      </Helmet>
      <GoBackHeader />
      <Row className="mt-3 mb-4">
        <Col xs="12">
          <h5 className="font-weight-bold">User Settings</h5>
        </Col>
      </Row>
      <Form role="form" onSubmit={e => onSubmit(e)}>
        <FormGroup row>
          <Label for="currency" sm={2}>
            Currency
          </Label>
          <Col sm={6}>
            <MBInput
              type="text"
              name="currency"
              value={currency}
              placeholder="eg. INR, USD"
              error={validations}
              onChange={e => dispatch(operations.changeCurrency(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="profitPercent" sm={2}>
            Profit Percent
          </Label>
          <Col sm={6}>
            <MBInput
              type="number"
              name="profitPercent"
              value={profitPercent}
              placeholder="eg. 10"
              error={validations}
              onChange={e => dispatch(operations.changeProfitPercent(e))}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="mt-3">{getSubmitButton()}</Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default UserSettings;
