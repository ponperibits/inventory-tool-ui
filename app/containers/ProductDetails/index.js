/**
 *
 * ProductDetails
 *
 */

import React, { useEffect, useState } from 'react';
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
import NotificationHandler from 'components/Notifications/NotificationHandler';
import CopyToClipboard from 'components/CopyToClipboard';
import AlertPopupHandler from 'components/AlertPopup/AlertPopupHandler';
import PrintPriceModal from 'components/PrintPriceModal';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useInjectReducer } from 'utils/injectReducer';
import indianNumberFormatter from 'utils/indianNumberFormatter';
import { get, isEmpty } from 'lodash';
import history from 'utils/history';
import { parseDateTime } from 'utils/dateTimeHelpers';
import { useCookies } from 'react-cookie';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ProductDetails() {
  useInjectReducer({ key: 'productDetails', reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(['user']);
  const [labelDetails, setLabelDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  const productDetailsInit = operations.productDetailsInit(dispatch);

  const {
    isLoading,
    productDetails,
    productHistory,
    paginationDetails,
  } = useSelector(state => ({
    isLoading: selectors.isLoading(state),
    productDetails: selectors.productDetails(state),
    productHistory: selectors.productHistory(state),
    paginationDetails: selectors.paginationDetails(state),
  }));

  const getProperty = (propertyName, defaultValue = '-') =>
    get(productDetails, propertyName, '') || defaultValue;

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { id } = qs.parse(location.search);
    if (id) {
      dispatch(operations.fetchProductDetails(id));
      dispatch(operations.fetchProductHistory({ productId: id, page: 1 }));
    } else {
      history.pushState('/product');
    }
    return () => productDetailsInit();
  }, []);

  const getOptions = () => (
    <Col>
      <i
        aria-hidden
        className="ms-auto far fa-edit text-muted hover-pointer hover-color-primary me-3"
        onClick={() => history.push(`/product/add?id=${getProperty('_id')}`)}
      />
      <i
        aria-hidden
        className="ms-auto fas fa-print text-muted hover-pointer hover-color-primary me-3"
        onClick={() => {
          if (
            getProperty('shortLabel', false) &&
            getProperty('sku', false) &&
            getProperty('sellingPrice', false) &&
            !isEmpty(selectors.getCurrency(cookie))
          ) {
            setLabelDetails({
              name: getProperty('name'),
              shortLabel: getProperty('shortLabel'),
              sku: getProperty('sku'),
              sellingPrice: getProperty('sellingPrice'),
              currency: selectors.getCurrency(cookie),
            });
            setShowModal(true);
          } else {
            NotificationHandler.open({
              operation: 'failure',
              message: 'Please fill al the necessary details',
              title: "Can't print label",
            });
          }
        }}
      />
      <i
        aria-hidden
        className="ms-auto fas fa-trash text-danger hover-pointer hover-color-primary me-2"
        onClick={() => onDelete(getProperty('_id'), getProperty('name'))}
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

  const getProductDetails = () => (
    <Card>
      <CardHeader>
        <Row className="px-1 align-items-center">
          <Col xs="12" md="10">
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
          <span className="text-muted">Product Label: </span>
          <span className="text-primary text-bold fw-bold">
            {getProperty('shortLabel')}
          </span>
        </p>
        <p>
          <span className="text-muted">SKU: </span>
          <CopyToClipboard text={getProperty('sku')}>
            <span className="text-primary hover-pointer text-bold fw-bold">
              {getProperty('sku')}
            </span>
          </CopyToClipboard>
        </p>
        <p>
          <span className="text-muted">
            Price ({selectors.getCurrency(cookie)}):{' '}
          </span>
          <span className="text-primary text-bold fw-bold">
            {indianNumberFormatter(getProperty('price'))}
          </span>
        </p>
        <p>
          <span className="text-muted">
            Selling Price ({selectors.getCurrency(cookie)}):{' '}
          </span>
          <span className="text-primary fw-bold">
            {indianNumberFormatter(getProperty('sellingPrice'))}
          </span>
        </p>
        <p>
          <span className="text-muted">No of Units in Stock: </span>
          <span className="text-primary fw-bold">
            {indianNumberFormatter(getProperty('noOfUnits', 0), true)}
          </span>
        </p>
        <p>
          <span className="text-muted">Minimum stock to be notified: </span>
          <span className="text-primary fw-bold">
            {indianNumberFormatter(getProperty('minStockWarning', 0), true)}
          </span>
        </p>
      </CardBody>
    </Card>
  );

  const getProductHistory = () =>
    isEmpty(productHistory) ? (
      <div>
        <span className="text-muted">No history found</span>
      </div>
    ) : (
      <>
        {productHistory.map(
          ({ transactionDate, supplierId, customerId, noOfUnits }, index) => (
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
                    <span className="fw-bold text-primary">
                      {get(supplierId, 'name', null) ||
                        get(customerId, 'name', null)}
                    </span>
                    <span className="text-muted">
                      {`${
                        supplierId ? 'Purchased' : 'Sold'
                      } ${indianNumberFormatter(noOfUnits, true)}`}
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
        )}
        {paginationDetails && paginationDetails.hasNextPage && (
          <Row>
            <Button
              size="sm"
              color="link"
              onClick={() =>
                dispatch(
                  operations.fetchProductHistory({
                    productId: get(productDetails, '_id'),
                    page: paginationDetails.nextPage,
                  }),
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
      <PrintPriceModal
        showModal={showModal}
        setShowModal={setShowModal}
        labelDetails={labelDetails}
      />
    </div>
  );
}

export default ProductDetails;
