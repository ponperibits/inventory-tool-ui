import * as yup from 'yup';

export default yup.object().shape({
  minStockWarning: yup
    .number('Min Stock Warning should be a number')
    .typeError('Min Stock Warning should be a number')
    .min(0, 'Minimum stock warning must be 0 or more'),
  sellingPrice: yup
    .number('Selling Price should be a number')
    .typeError('Selling Price should be a number')
    .min(0, 'Selling price must be 0 or more')
    .required('Selling Price is required'),
  price: yup
    .number('Price should be a number')
    .typeError('Price should be a number')
    .min(0, 'Price must be 0 or more')
    .required('Price is required'),
  description: yup.string(),
  name: yup.string().required('Name is required'),
});
