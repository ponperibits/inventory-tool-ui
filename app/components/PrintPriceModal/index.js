/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import PriceLabelModal from 'components/PriceLabelModal';
import { get } from 'lodash';
import './styles.scss';

const PrintPriceModal = ({ showModal, setShowModal, labelDetails }) => {
  const printRef = useRef();

  return (
    <Modal isOpen={showModal} size="xl">
      <ModalBody>
        <div className="printPage" ref={printRef}>
          <div className="printInnerPage d-flex flex-wrap">
            {Array(16)
              .fill('0')
              .map(() => (
                <PriceLabelModal
                  name={get(labelDetails, 'shortLabel')}
                  sku={get(labelDetails, 'sku')}
                  sellingPrice={get(labelDetails, 'sellingPrice')}
                  currency={get(labelDetails, 'currency')}
                />
              ))}
          </div>
        </div>
        <ReactToPrint
          trigger={() => <Button color="primary">Print</Button>}
          content={() => printRef.current}
        />
        <Button
          className="ms-1"
          color="outline-primary"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default PrintPriceModal;
