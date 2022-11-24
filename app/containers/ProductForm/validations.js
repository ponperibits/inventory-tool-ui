import * as yup from 'yup';

export default yup.object().shape({
  supplierId: yup.string().required('Supplier is required'),
  noOfUnits: yup.number().required('No of Units is required'),
  currency: yup.string().required('Currency is required'),
  sellingPrice: yup
    .number()
    .min(0)
    .required('Selling Price is required'),
  price: yup
    .number()
    .min(0)
    .required('Price is required'),
  description: yup.string(),
  name: yup.string().required('Name is required'),
});
