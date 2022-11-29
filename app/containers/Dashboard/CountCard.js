/* eslint-disable react/prop-types */
import React from 'react';
import history from 'utils/history';
import { Row, Col, Card, CardBody } from 'reactstrap';

export default function CountCard({ title, route, count }) {
  return (
    <Col
      className="col-xl-3 col-sm-3 mb-xl-0 mt-3 hover-pointer"
      onClick={() => history.push(`/${route}`)}
      sm="4"
    >
      <Card className="w-100">
        <CardBody className="p-3">
          <Row>
            <Col xs="8">
              <p className="text-sm mb-0 text-uppercase font-weight-bold">
                {title}
              </p>
              <h3 className="font-weight-bold text-primary">{count}</h3>
            </Col>
            <Col xs="4" className="text-end">
              <div className="icon icon-shape bg-gradient-danger shadow-primary text-center text-secondary rounded-circle">
                <i
                  className="far fa-building text-lg opacity-10"
                  aria-hidden="true"
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
}
