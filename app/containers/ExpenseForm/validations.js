import * as yup from 'yup';

export default yup.object().shape({
  notes: yup.string(),
  amount: yup
    .number('Amount should be a number')
    .typeError('Amount should be a number')
    .min(0, 'Amount must be 0 or more')
    .required('Amount is required'),
  title: yup.string().required('Title is required'),
});
