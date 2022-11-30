import * as yup from 'yup';

export default yup.object().shape({
  profitPercent: yup
    .number('Profit Percent should be a number')
    .typeError('Profit Percent should be a number')
    .min(1, 'Profit Percent must be 1 or more')
    .max(100, 'Profit Percent must be 100 or less'),
  currency: yup.string(),
});
