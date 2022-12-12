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
  sku: yup
    .string()
    .max(13, "SKU shouldn't exceed 13 characters")
    .required('SKU is required'),
  description: yup.string(),
  shortLabel: yup
    .string()
    .max(50, "Short Label shouldn't exceed 50 characters")
    .required('Short Label is required'),
  name: yup.string().required('Name is required'),
});
