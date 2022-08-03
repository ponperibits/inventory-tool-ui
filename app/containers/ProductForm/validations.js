import * as yup from 'yup';

export default yup.object().shape({
  minStockWarning: yup
    .number()
    .min(0, 'Minimum stock warning must be 0 or more'),
  currency: yup.string().required('Currency is required'),
  sellingPrice: yup
    .number()
    .min(0, 'Selling price must be 0 or more')
    .required('Selling Price is required'),
  price: yup
    .number()
    .min(0, 'Price must be 0 or more')
    .required('Price is required'),
  description: yup.string(),
  name: yup.string().required('Name is required'),
});
