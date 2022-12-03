/**
 *
 * PartyDetails
 *
 */

import React, { useEffect } from 'react';
import qs from 'query-string';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Badge,
  Button,
} from 'reactstrap';
import Loader from 'components/Loaders';
import GoBackHeader from 'components/GoBackHeader';
import AlertPopupHandler from 'components/AlertPopup/AlertPopupHandler';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useInjectReducer } from 'utils/injectReducer';
import { get, isEmpty } from 'lodash';
import history from 'utils/history';
import indianNumberFormatter from 'utils/indianNumberFormatter';
import { SUPPLIER } from 'utils/appConstants';
import { parseDateTime } from 'utils/dateTimeHelpers';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ProductDetails() {
  useInjectReducer({ key: 'partyDetails', reducer });
  const dispatch = useDispatch();
  const partyDetailsInit = operations.partyDetailsInit(dispatch);

  const {
    isLoading,
    partyDetails,
    partyHistory,
    paginationDetails,
  } = useSelector(state => ({
    isLoading: selectors.isLoading(state),
    partyDetails: selectors.partyDetails(state),
    partyHistory: selectors.partyHistory(state),
    paginationDetails: selectors.paginationDetails(state),
  }));

  const getProperty = (propertyName, defaultValue = '-') =>
    get(partyDetails, propertyName, '') || defaultValue;

  const buildQuery = (page = 1) =>
    getProperty('type') === SUPPLIER
      ? { supplierId: getProperty('_id'), page }
      : { customerId: getProperty('_id'), page };

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { id } = qs.parse(location.search);
    if (id) {
      dispatch(operations.fetchPartyDetails(id));
    } else {
      history.pushState('/party');
    }
    return () => partyDetailsInit();
  }, []);

  useEffect(() => {
    if (!isEmpty(partyDetails)) {
      dispatch(operations.fetchPartyHistory(buildQuery()));
    }
  }, [partyDetails]);

  const getOptions = () => (
    <Col>
      <i
        aria-hidden
        className="ms-auto far fa-edit text-muted hover-pointer hover-color-primary me-3"
        onClick={() => history.push(`/party/add?id=${getProperty('_id')}`)}
      />
      <i
        aria-hidden
        className="ms-auto fas fa-trash text-danger hover-pointer hover-color-primary me-2"
        onClick={() => onDelete(getProperty('_id'), getProperty('name'))}
      />
    </Col>
  );

  const getPartyLoading = () => (
    <>
      <Card>
        <CardHeader>
          <Loader />
        </CardHeader>
        <CardBody>
          <Row className="mx-2 mb-3">
            <Col xs="2">
              <Loader />
            </Col>
          </Row>
        </CardBody>
        <CardBody>
          <Row className="mx-2 mb-3">
            <Col xs="2">
              <Loader />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );

  const onDelete = (id, name) => {
    AlertPopupHandler.open({
      onConfirm: () => dispatch(operations.onDelete(id)),
      confirmBtnText: 'Delete',
      text: (
        <>
          You are about to delete{' '}
          <span className="fw-bold fst-italic">{name}</span>. Do you want to
          continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: 'text-xs',
      btnSize: 'sm',
      confirmBtnBsStyle: 'danger',
      cancelBtnBsStyle: 'outline-danger',
    });
  };

  const getPartyDetails = () => (
    <Card>
      <CardHeader>
        <Row className="px-1 align-items-center">
          <Col xs="12" md="11" className="d-flex align-items-center">
            <span className="h2 me-2 text-primary">{getProperty('name')}</span>{' '}
            <Badge
              color={getProperty('type') === SUPPLIER ? 'danger' : 'success'}
            >
              {getProperty('type')}
            </Badge>
          </Col>
          {getOptions()}
        </Row>
      </CardHeader>
      <CardBody className="border-top border">
        <div className="my-1">
          <span className="h5 text-muted">Business Details:</span>
        </div>
        <p>
          <span className="text-muted">GST Number: </span>
          <span className="text-primary text-bold fw-bold">
            {getProperty('gstNumber')}
          </span>
        </p>
        <p>
          <span className="text-muted">PAN Number: </span>
          <span className="text-primary fw-bold">
            {getProperty('panNumber')}
          </span>
        </p>
      </CardBody>
      <CardBody>
        <div className="my-1">
          <span className="h5 text-muted">Party Details:</span>
        </div>
        <p>
          <span className="text-muted">Phone: </span>
          <span className="text-primary fw-bold">{getProperty('phone')}</span>
        </p>
        <p>
          <span className="text-muted">Category: </span>
          <span className="text-primary fw-bold">
            {getProperty('category')}
          </span>
        </p>
        <p>
          <span className="text-muted">Address: </span>
          <span className="text-primary fw-bold">{getProperty('address')}</span>
        </p>
      </CardBody>
    </Card>
  );

  const getPartyHistory = () =>
    isEmpty(partyHistory) ? (
      <div>
        <span className="text-muted">No history</span>
      </div>
    ) : (
      <>
        {partyHistory.map(
          ({ transactionDate, supplierId, productId, noOfUnits }, index) => (
            <>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <Badge
                    color={supplierId ? 'danger' : 'success'}
                    className="me-3"
                  >
                    {supplierId ? (
                      <i className="fas fa-truck" />
                    ) : (
                      <i className="fas fa-box" />
                    )}
                  </Badge>
                  <div className="d-flex flex-column">
                    <span className="text-muted">
                      {`${
                        supplierId ? 'Purchased' : 'Sold'
                      } ${indianNumberFormatter(
                        noOfUnits,
                        true,
                      )} units of ${get(productId, 'name', '-')}`}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-muted">
                    {parseDateTime(transactionDate)}
                  </span>
                </div>
              </div>
              {index + 1 !== partyHistory.length && <hr />}
            </>
          ),
        )}
        {paginationDetails && paginationDetails.hasNextPage && (
          <Row>
            <Button
              size="sm"
              color="link"
              onClick={() =>
                dispatch(
                  operations.fetchPartyHistory(
                    buildQuery(paginationDetails.nextPage),
                  ),
                )
              }
            >
              See More
            </Button>
          </Row>
        )}
      </>
    );

  return (
    <div className="productDetails mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Product Details</title>
        <meta name="description" content="Description of Product Details" />
      </Helmet>
      <GoBackHeader />
      <Row className="mt-4">
        <Col xs="12" md="8">
          {isLoading ? getPartyLoading() : getPartyDetails()}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" md="8">
          <Card>
            <CardHeader className="fw-bold">History</CardHeader>
            <CardBody>{getPartyHistory()}</CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetails;
