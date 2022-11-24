import * as yup from 'yup';

export default yup.object().shape({
  address: yup.string(),
  category: yup.string(),
  panNumber: yup.string(),
  gstNumber: yup
    .string()
    .nullable()
    .transform((v, o) => (o === '' ? null : v))
    .matches(
      /[0-9]{2}[A-Z|a-z]{5}[0-9]{4}[A-Z|a-z][1-9]Z[A-Z|0-9|a-z]/,
      'Enter a valid GSTIN',
    ),
  type: yup.string().required("Type can't be Empty"),
  phone: yup.string().required('Phone is required'),
  name: yup.string().required('Name is required'),
});
