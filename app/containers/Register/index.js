/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Button,
  Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import MBInput from 'components/MBInput';
import reducer from './reducer';
import * as selectors from './selectors';
import * as operations from './actions';

function Register() {
  useInjectReducer({ key: 'registerPage', reducer });
  const dispatch = useDispatch();
  const changeName = operations.changeName(dispatch);
  const changeEmail = operations.changeEmail(dispatch);
  const changePassword = operations.changePassword(dispatch);
  const changeOrgName = operations.changeOrgName(dispatch);
  const registerInit = operations.registerInit(dispatch);
  const changeEmailCode = operations.changeEmailCode(dispatch);

  const {
    name,
    email,
    password,
    orgName,
    isLoading,
    errorMessage,
    validations,
    showEmailVerification,
    emailCode,
  } = useSelector(state => ({
    name: selectors.fullname(state),
    email: selectors.email(state),
    password: selectors.password(state),
    orgName: selectors.orgName(state),
    isLoading: selectors.isLoading(state),
    errorMessage: selectors.errorMessage(state),
    validations: selectors.validations(state),
    showEmailVerification: selectors.showEmailVerification(state),
    emailCode: selectors.emailCode(state),
  }));

  const disableResendCode = useSelector(state =>
    selectors.disableResendCode(state),
  );

  // React.useEffect(() => {
  //   dispatch(operations.setOAuthConfig());
  // }, []);

  const onSubmit = e => {
    e.preventDefault();
    return dispatch(
      operations.onSubmit({
        name,
        email,
        password,
        orgName,
      }),
    );
  };

  const onVerify = e => {
    e.preventDefault();

    return dispatch(
      operations.verifyCode({
        email,
        code: emailCode,
      }),
    );
  };
  const getSubmitButton = (buttonText, onClick) => {
    if (isLoading)
      return (
        <Button color="primary" className="btn-icon" disabled>
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>
          <span className="btn-inner-text">{buttonText}</span>
        </Button>
      );
    return (
      <Button color="primary" onClick={e => onClick(e)} type="submit">
        {buttonText}
      </Button>
    );
  };

  const getEmailVerification = () => (
    <div>
      <Row className="mb-3 justify-content-center">
        <div className="text-xs text-center text-primary">
          We have sent an OTP to your registered email address, Kindly enter it
          to verify your login attempt
        </div>
      </Row>
      <Form className="mb-4" onSubmit={e => onVerify(e)}>
        <FormGroup className="mb-3 px-4">
          <MBInput
            onChange={changeEmailCode}
            type="text"
            placeholder="Verification Code"
            name="code"
            error={validations}
            value={emailCode}
            className="text-center text-primary text-bold"
          />
        </FormGroup>
        <Row className="text-center justify-content-center mb-3">
          <Col>{getSubmitButton('Continue', onVerify)}</Col>
        </Row>
        {getErrorComponent()}
      </Form>
      <Row className="mb-3 justify-content-center">
        <div className="text-xs text-center text-muted">
          <div>Didn't receive the verification code yet?</div>
          <Button
            className="ml-2 pl-0"
            size="sm"
            color="link"
            onClick={() => dispatch(operations.resendCode(email))}
            disabled={disableResendCode}
          >
            Resend Code
          </Button>
        </div>
      </Row>
    </div>
  );

  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-3">
          <div className="text-center text-xs text-warning font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };

  const getRegisterForm = () => (
    <>
      <Form onSubmit={e => onSubmit(e)}>
        <FormGroup className="mb-3" value={name}>
          <MBInput
            onChange={changeName}
            icon="ni-single-02"
            type="text"
            placeholder="John Doe"
            error={validations}
            name="name"
            value={name}
          />
        </FormGroup>
        <FormGroup className="mb-3" value={email}>
          <MBInput
            onChange={changeEmail}
            icon="ni-email-83"
            type="email"
            placeholder="johndoe@example.com"
            error={validations}
            name="email"
            value={email}
          />
        </FormGroup>
        <FormGroup className="mb-3" value={password}>
          <MBInput
            onChange={changePassword}
            icon="ni-lock-circle-open"
            type="password"
            placeholder="Password"
            error={validations}
            name="password"
            value={password}
          />
        </FormGroup>
        <FormGroup className="mb-3" value={orgName}>
          <MBInput
            onChange={changeOrgName}
            icon="ni-lock-circle-open"
            placeholder="Eg. Google, Microsoft"
            error={validations}
            name="orgName"
            value={orgName}
          />
        </FormGroup>
        <Row className="text-center justify-content-center mb-3">
          <Col>{getSubmitButton('Signup', onSubmit)}</Col>
        </Row>
        {getErrorComponent()}
        <Row className="justify-content-center">
          <div className="text-center text-xs text-muted">
            Already have an account?{' '}
            <Link to="/auth" onClick={registerInit}>
              Login In
            </Link>
          </div>
        </Row>
      </Form>
    </>
  );

  return (
    <>
      <Container className="py-6 py-lg-8 pt-lg-9">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-white">
              <CardHeader>
                <div className="text-center">
                  <h1 className="text-primary">Inventory Tool</h1>
                </div>
              </CardHeader>
              <CardBody className="mx-md-4 mx-lg-4">
                {showEmailVerification
                  ? getEmailVerification()
                  : getRegisterForm()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
