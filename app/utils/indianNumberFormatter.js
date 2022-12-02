import { toNumber, isNumber } from 'lodash';

const indianNumberFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 0,
});

const indianPriceFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
});

const formatNumber = (value, isNumValue = false) => {
  if (!isNumber(value)) return 0;

  return isNumValue
    ? indianNumberFormatter.format(toNumber(value))
    : indianPriceFormatter.format(toNumber(value));
};

export default formatNumber;
export { indianNumberFormatter };
