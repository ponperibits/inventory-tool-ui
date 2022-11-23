/**
 *
 * ProductManagement
 *
 */

import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'reactstrap';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import classNames from 'classnames';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ProductManagement() {
  useInjectReducer({ key: 'productManagement', reducer });
  const dispatch = useDispatch();

  const parties = useSelector(selectors.products);

  useEffect(() => {
    dispatch(operations.fetchProducts());
  }, []);

  const getPartiesData = () =>
    parties.map(({ _id, name, price, sellingPrice, noOfUnits, supplierId }) => (
      <React.Fragment key={_id}>
        <tr
          className={classNames({
            'table-danger': noOfUnits < 5,
          })}
        >
          <td>{name}</td>
          <td>{price}</td>
          <td>{sellingPrice}</td>
          <td>{noOfUnits}</td>
          <td>{supplierId}</td>
          <td>-</td>
        </tr>
      </React.Fragment>
    ));

  return (
    <div className="productManagement  mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Product Management</title>
        <meta name="description" content="Description of Product Management" />
      </Helmet>
      <Row className="mt-3 d-flex justify-content-between align-items-center">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push('/add-product')}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>{' '}
            <span className="btn-inner--text">Add Product</span>
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped hover className="mt-3 align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Selling Price</th>
              <th scope="col">No. of Units</th>
              <th scope="col">Supplier</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{getPartiesData()}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductManagement;
