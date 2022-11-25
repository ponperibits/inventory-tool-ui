/**
 *
 * ProductDetails
 *
 */

import React, { useEffect } from 'react';
import qs from 'query-string';
import { Card, CardHeader, CardBody, Row, Col, Badge } from 'reactstrap';
import Loader from 'components/Loaders';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useInjectReducer } from 'utils/injectReducer';
import { get } from 'lodash';
import history from 'utils/history';
import { parseDateTime } from 'utils/dateTimeHelpers';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ProductDetails() {
  useInjectReducer({ key: 'productDetails', reducer });
  const dispatch = useDispatch();
  const productDetailsInit = operations.productDetailsInit(dispatch);

  const { isLoading, productDetails, productHistory } = useSelector(state => ({
    isLoading: selectors.isLoading(state),
    productDetails: selectors.productDetails(state),
    productHistory: selectors.productHistory(state),
  }));

  const getProperty = (propertyName, defaultValue = '-') =>
    get(productDetails, propertyName, '') || defaultValue;

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { id } = qs.parse(location.search);
    if (id) {
      dispatch(operations.fetchProductDetails(id));
      dispatch(operations.fetchProductHistory(id));
    } else {
      history.pushState('/product');
    }
    return () => productDetailsInit();
  }, []);

  const getOptions = () => (
    <Col>
      <i
        aria-hidden
        className="ms-auto far fa-edit text-muted hover-pointer hover-color-primary mr-2"
        onClick={() => history.push(`/product/add?id=${getProperty('_id')}`)}
      />
    </Col>
  );

  const getProductLoading = () => (
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

  const getProductDetails = () => (
    <Card>
      <CardHeader>
        <Row className="px-1 align-items-center">
          <Col xs="12" md="11">
            <span className="h2 mr-2 text-primary">{getProperty('name')}</span>
          </Col>
          {getOptions()}
        </Row>
        <Row className="mt-3 text-md text-muted">
          <Col className="mx-2">
            <div>{getProperty('description')}</div>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="border-top border">
        <div className="my-1">
          <span className="h5 text-muted">Details:</span>
        </div>
        <p>
          <span className="text-muted">Price: </span>
          <span className="text-primary text-bold fw-bold">
            {getProperty('price')}
          </span>
        </p>
        <p>
          <span className="text-muted">Selling Price: </span>
          <span className="text-primary fw-bold">
            {getProperty('sellingPrice')}
          </span>
        </p>
        <p>
          <span className="text-muted">No of Units in Stock: </span>
          <span className="text-primary fw-bold">
            {getProperty('noOfUnits', 0)}
          </span>
        </p>
      </CardBody>
      <CardBody>
        <div className="my-1">
          <span className="h5 text-muted">Supplier Details:</span>
        </div>
        <p>
          <span className="text-muted">Supplier Name: </span>
          <span
            aria-hidden
            className="hover-pointer text-primary text-bold fw-bold"
            onClick={() =>
              history.push(`/party/view?id=${getProperty('supplierId._id')}`)
            }
          >
            {getProperty('supplierId.name')}
          </span>
        </p>
      </CardBody>
    </Card>
  );

  const getProductHistory = () =>
    productHistory.map(
      ({ transactionDate, supplierId, customerId, noOfUnits }, index) => (
        <>
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <Badge color={supplierId ? 'danger' : 'success'} className="me-3">
                {supplierId ? (
                  <i className="fas fa-truck" />
                ) : (
                  <i className="fas fa-box" />
                )}
              </Badge>
              <div className="d-flex flex-column">
                <span className="fw-bold text-primary">
                  {get(supplierId, 'name', null) ||
                    get(customerId, 'name', null)}
                </span>
                <span className="text-muted">
                  {supplierId ? `Purchased ${noOfUnits}` : `Sold ${noOfUnits}`}
                </span>
              </div>
            </div>
            <div>
              <span className="text-muted">
                {parseDateTime(transactionDate)}
              </span>
            </div>
          </div>
          {index + 1 !== productHistory.length && <hr />}
        </>
      ),
    );

  return (
    <div className="productDetails mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Product Details</title>
        <meta name="description" content="Description of Product Details" />
      </Helmet>
      <Row className="mt-4">
        <Col xs="12" md="8">
          {isLoading ? getProductLoading() : getProductDetails()}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" md="8">
          <Card>
            <CardHeader className="fw-bold">History</CardHeader>
            <CardBody>{getProductHistory()}</CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetails;
