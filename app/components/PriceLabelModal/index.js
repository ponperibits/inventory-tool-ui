/* eslint-disable react/prop-types */
import React from 'react';
import { Col } from 'reactstrap';
import Barcode from 'react-barcode';
import indianNumberFormatter from 'utils/indianNumberFormatter';

const PriceLabelModal = ({ name, sellingPrice, currency, sku }) => (
  <Col className="priceLabel text-center">
    <Barcode value={sku} height="40" textMargin="1" fontSize="15" />
    <div>
      <span className="fw-bold">{name}</span>
    </div>
    <div>
      {currency} {indianNumberFormatter(sellingPrice)}
    </div>
  </Col>
);

export default PriceLabelModal;
