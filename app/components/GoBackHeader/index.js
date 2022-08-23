import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import history from 'utils/history';

const GoBackHeader = () => (
  <Row className="mt-3">
    <Col xs={12} className="d-flex align-items-center">
      <Button
        className="btn-icon-only p-0 me-2"
        color="link"
        type="button"
        size="lg"
        onClick={() => {
          history.goBack();
        }}
      >
        <span className="btn-inner--icon">
          <i className="fas fa-long-arrow-alt-left" />
        </span>
      </Button>
      <span className="fw-bold text-muted">Go Back</span>
    </Col>
  </Row>
);

export default GoBackHeader;
