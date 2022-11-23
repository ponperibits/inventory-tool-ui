/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { toNumber, isArray, isNil, find, get } from 'lodash';

function MBInput({
  icon,
  error,
  placeholder,
  type,
  className,
  value,
  onFocus,
  ref,
  name,
  disable,
  onChange,
}) {
  const isErrorAvailable = !isNil(error);
  const isErrorArray = isErrorAvailable && isArray(error);
  const correctError = isErrorArray ? find(error, ['path', name]) : error;
  const isValidError =
    isErrorAvailable && !!correctError && get(correctError, 'path') === name;

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(oldBool => !oldBool);
  };

  return (
    <>
      <InputGroup
        className={classnames(
          'rt-input input-group-merge input-group-alternative',
          {
            danger: isValidError,
          },
        )}
      >
        {icon && (
          <InputGroupText>
            <i className={`ni ${icon}`} />
          </InputGroupText>
        )}
        <Input
          placeholder={placeholder}
          type={type === 'password' && passwordShown ? 'text' : type}
          onChange={e => {
            if (type === 'number') {
              return onChange(toNumber(e.target.value));
            }
            onChange(e.target.value);
          }}
          autoComplete="true"
          className={className}
          value={value}
          onFocus={onFocus}
          ref={ref}
          disabled={disable}
        />
        {type === 'password' && (
          <InputGroupText>
            <i
              onClick={togglePasswordVisiblity}
              className={`hover-pointer ${
                passwordShown ? 'far fa-eye-slash' : 'far fa-eye'
              }`}
            />
          </InputGroupText>
        )}
      </InputGroup>
      {isValidError ? (
        <div className="text-xs text-danger ml-1 pt-1">
          {correctError.message}
        </div>
      ) : null}
    </>
  );
}

MBInput.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  disable: PropTypes.bool,
  onChange: PropTypes.func,
};
export default MBInput;
