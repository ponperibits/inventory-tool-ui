/* eslint-disable react/prop-types */
/**
 *
 * MBSelect
 *
 */

import React from 'react';
import classnames from 'classnames';
import { InputGroup } from 'reactstrap';
import Select2 from 'react-select2-wrapper';

function MBSelect({
  closeMenuOnSelect,
  isMulti = false,
  data,
  placeholder,
  defaultValue,
  error = {
    path: null,
    message: null,
  },
  value,
  onChange,
  name,
  ...rest
}) {
  const hasError = !!error && error.path === name;
  return (
    <>
      <InputGroup
        className={classnames('input-group-alternative', {
          warning: hasError,
        })}
      >
        <Select2
          className="form-control"
          multiple={isMulti}
          data={data}
          options={{
            placeholder,
            closeOnSelect: closeMenuOnSelect,
          }}
          onSelect={e => onChange(e.params.data.id)}
          onUnselect={e => onChange(e)}
          value={value}
          defaultValue={defaultValue}
          {...rest}
        />
      </InputGroup>
      {hasError ? (
        <div className="text-xs text-danger ml-1 pt-1">{error.message}</div>
      ) : null}
    </>
  );
}

MBSelect.propTypes = {};

export default MBSelect;
