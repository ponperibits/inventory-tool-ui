import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
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

function Login() {
  useInjectReducer({ key: 'loginPage', reducer });
  const dispatch = useDispatch();
  const changeEmail = operations.changeEmail(dispatch);
  const changePassword = operations.changePassword(dispatch);
  const loginInit = operations.loginInit(dispatch);

  const { email, password, isLoading, errorMessage, validations } = useSelector(
    state => ({
      email: selectors.email(state),
      password: selectors.password(state),
      isLoading: selectors.isLoading(state),
      errorMessage: selectors.errorMessage(state),
      validations: selectors.validations(state),
    }),
  );

  // React.useEffect(() => () => loginInit(), []);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      operations.onSubmit({
        email,
        password,
      }),
    );
  };

  const getSubmitButton = () => {
    if (isLoading)
      return (
        <Button type="button" color="primary" className="btn-icon" disabled>
          <span className="btn-inner-icon">
            <Spinner size="sm" className="mr-2" />
          </span>{' '}
          <span className="btn-inner-text">Login</span>
        </Button>
      );
    return (
      <Button color="primary" type="submit" onClick={e => onSubmit(e)}>
        Login
      </Button>
    );
  };

  const getErrorComponent = () => {
    if (errorMessage)
      return (
        <Row className="justify-content-center mb-1 mt-3">
          <div className="text-center text-xs text-danger font-weight-bold">
            {errorMessage}
          </div>
        </Row>
      );
    return null;
  };

  return (
    <>
      <Container className="py-6 py-lg-8 pt-lg-9 login">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-white">
              <CardHeader>
                <div className="text-center">
                  <h1 className="text-primary">Inventory Tool</h1>
                </div>
              </CardHeader>
              <CardBody className="mx-md-4 mx-lg-4">
                <Form role="form" onSubmit={e => onSubmit(e)}>
                  <FormGroup className="mb-3" value={email}>
                    <MBInput
                      onChange={changeEmail}
                      icon="ni-email-83"
                      type="email"
                      placeholder="Email Address"
                      error={validations}
                      name="email"
                      value={email}
                    />
                  </FormGroup>
                  <FormGroup value={password}>
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
                  <Row className="text-center">
                    <Col>{getSubmitButton()}</Col>
                    {/* <Col className="text-right" xs="6">
                      <Link
                        to="/auth/resetpassword"
                        className="text-xs"
                        onClick={loginInit}
                      >
                        Forgot Password?
                      </Link>
                    </Col> */}
                  </Row>
                  {getErrorComponent()}
                  {/* <Row className="justify-content-center">
                    <Col xs="4">
                      <hr />
                    </Col>
                    <Col xs="4" className="text-center text-muted mt-3">
                      or
                    </Col>
                    <Col xs="4">
                      <hr />
                    </Col>
                  </Row> */}
                </Form>
                <Row className="mt-3 text-center justify-content-center">
                  <div className="text-muted text-xs">
                    New User?{' '}
                    <Link to="/auth/register" onClick={loginInit}>
                      Signup now
                    </Link>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
