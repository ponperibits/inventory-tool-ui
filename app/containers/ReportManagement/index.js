/* eslint-disable no-underscore-dangle */
/**
 *
 * ReportManagement
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Label,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import ReactDatetime from 'react-datetime';
import RSelectAsync from 'components/RSelectAsync';
import { Helmet } from 'react-helmet';
import ReactToPrint from 'react-to-print';
import Table from 'components/Table';
import { useDispatch, useSelector } from 'react-redux';
import indianNumberFormatter from 'utils/indianNumberFormatter';
import * as XLSX from 'xlsx/xlsx.mjs';
import { useInjectReducer } from 'utils/injectReducer';
import { CUSTOMER } from 'utils/appConstants';
import {
  disableFutureDates,
  isAfterDate,
  parseDate,
} from 'utils/dateTimeHelpers';
import { useCookies } from 'react-cookie';
import { get } from 'lodash';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ReportManagement() {
  useInjectReducer({ key: 'reportManagement', reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(['user']);

  const reportInit = operations.reportInit(dispatch);
  const printRef = useRef();

  const reportList = useSelector(selectors.reportList);
  const reportType = useSelector(selectors.reportType);
  const selectedEntity = useSelector(selectors.selectedEntity);
  const startDate = useSelector(selectors.startDate);
  const endDate = useSelector(selectors.endDate);

  const [shapedCSVData, setShapedCSVData] = useState([]);

  useEffect(() => () => reportInit(), []);

  useEffect(() => {
    dispatch(operations.setReportList([]));
  }, [reportType, startDate, endDate, selectedEntity]);

  useEffect(() => {
    setShapedCSVData(
      reportList.map(
        ({
          transactionDate,
          noOfUnits,
          prodUnitsBalance,
          amount,
          ...rest
        }) => ({
          'Transaction Date': parseDate(transactionDate),
          Name:
            reportType === 'Party'
              ? get(rest, 'productId.name')
              : get(rest, 'customerId.name', get(rest, 'supplierId.name')),
          Type: get(rest, 'customerId.name') ? 'Sale' : 'Purchase',
          'No of Units': noOfUnits,
          'Product Units Balance': prodUnitsBalance,
          Amount: amount,
        }),
      ),
    );
  }, [reportList]);

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(shapedCSVData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    const wbout = XLSX.write(wb, { bookType: 'csv', type: 'binary' });

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      // eslint-disable-next-line no-bitwise
      for (let i = 0; i !== s.length; i += 1) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }

    // eslint-disable-next-line no-undef
    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      `${reportType}_Report - ${get(selectedEntity, 'name', '')} - ${parseDate(
        startDate,
      )} to ${parseDate(endDate)}.csv`,
    );
  };

  const shapeParams = () => {
    if (reportType === 'Product') {
      return {
        startDate,
        endDate,
        productId: selectedEntity._id,
      };
    }

    if (get(selectedEntity, 'type') === CUSTOMER) {
      return {
        startDate,
        endDate,
        customerId: selectedEntity._id,
      };
    }

    return {
      startDate,
      endDate,
      supplierId: selectedEntity._id,
    };
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(operations.onSubmit(shapeParams()));
  };

  return (
    <div className="reportManagement mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Report Management</title>
        <meta name="description" content="Description of Report Management" />
      </Helmet>
      <Row className="mt-3 d-flex justify-content-between align-items-center">
        <Col>
          <h3>Reports</h3>
        </Col>
      </Row>
      <Form role="form" onSubmit={e => onSubmit(e)}>
        <Row>
          <Col>
            {['Product', 'Party'].map(item => (
              <Button
                className="ms-1"
                color={reportType === item ? 'primary' : 'outline-primary'}
                key={item}
                onClick={() => {
                  dispatch(operations.changeReportType(item));
                  dispatch(operations.changeEntity());
                }}
              >
                {item}
              </Button>
            ))}
          </Col>
        </Row>
        <Row className="mt-3 align-items-end">
          <Col sm={2}>
            <Label for="gstNumber">{reportType}</Label>
            <Col sm={11}>
              <RSelectAsync
                groupClassName="m-0"
                shouldInitialLoad
                controlShouldRenderValue
                placeholder={`Select ${reportType}`}
                url={`/api/${reportType.toLowerCase()}`}
                name="selectedEntity"
                value={selectedEntity}
                param="searchText"
                id="selectedEntity"
                getOptionLabel={option => option.name}
                getOptionValue={option => option._id}
                onChange={e => {
                  if (e) {
                    dispatch(operations.changeEntity(e));
                  } else {
                    dispatch(operations.changeEntity());
                  }
                }}
              />
            </Col>
          </Col>
          <Col sm={2}>
            <Label for="gstNumber">Start Date</Label>
            <Col>
              <InputGroup className="input-group-alternative">
                <ReactDatetime
                  inputProps={{
                    placeholder: 'Select Start Date',
                  }}
                  isValidDate={disableFutureDates}
                  dateFormat="DD-MM-YYYY"
                  timeFormat={false}
                  onChange={e => dispatch(operations.changeStartDate(e))}
                  value={startDate}
                />
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroup>
            </Col>
          </Col>
          <Col sm={2}>
            <Label for="gstNumber">End Date</Label>
            <Col>
              <InputGroup className="input-group-alternative">
                <ReactDatetime
                  inputProps={{
                    placeholder: 'Select End Date',
                  }}
                  isValidDate={date =>
                    disableFutureDates(date) && isAfterDate(startDate, date)
                  }
                  dateFormat="DD-MM-YYYY"
                  timeFormat={false}
                  onChange={e => dispatch(operations.changeEndDate(e))}
                  value={endDate}
                />
                <InputGroupText>
                  <i className="ni ni-calendar-grid-58" />
                </InputGroupText>
              </InputGroup>
            </Col>
          </Col>
          <Col>
            <Button color="primary">Generate Report</Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <Row className="mt-4 d-flex justify-content-end align-items-center">
        <Col sm={2}>
          <Row>
            <Col className="text-end">
              <ReactToPrint
                trigger={() => (
                  <Button color="outline-primary" type="button" size="sm">
                    Print
                  </Button>
                )}
                content={() => printRef.current}
              />
            </Col>
            <Col>
              <Button
                color="outline-primary"
                type="button"
                size="sm"
                onClick={() => exportToCSV()}
              >
                Export
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div ref={printRef}>
        <Row className="p-2">
          <Col sm={10}>
            <h4>
              {reportType} Report - {get(selectedEntity, 'name', 'N/A')}
            </h4>
            From {parseDate(startDate)} to {parseDate(endDate)}
          </Col>
        </Row>
        <hr />
        <Table
          bootstrap4
          striped
          search={false}
          bordered={false}
          keyField="_id"
          data={reportList}
          paginationOptions={null}
          columns={[
            {
              text: 'Transaction Date',
              dataField: 'transactionDate',
              formatter: cell => parseDate(cell),
            },
            {
              text: 'Name',
              dataField: 'productId',
              formatter: (cell, row) =>
                reportType === 'Party'
                  ? get(cell, 'name')
                  : get(row, 'customerId.name', get(row, 'supplierId.name')),
            },
            {
              text: 'Type',
              dummyField: true,
              formatter: (cell, row) =>
                get(row, 'customerId.name') ? 'Sale' : 'Purchase',
            },
            {
              text: 'No. of Units',
              dataField: 'noOfUnits',
              formatter: cell => indianNumberFormatter(cell, true),
            },
            {
              text: 'Product Units Balance',
              dataField: 'prodUnitsBalance',
              formatter: cell => indianNumberFormatter(cell, true),
            },
            {
              text: 'Amount',
              dataField: 'amount',
              formatter: cell =>
                `${selectors.getCurrency(cookie)} ${indianNumberFormatter(
                  cell,
                )}`,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ReportManagement;
