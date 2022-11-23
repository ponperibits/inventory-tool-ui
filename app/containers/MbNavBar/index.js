/**
 *
 * MbNavBar
 *
 */

import React from 'react';
import {
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  ListGroupItem,
  ListGroup,
} from 'reactstrap';
import { useCookies } from 'react-cookie';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import * as selectors from './selectors';
import reducer from './reducer';

export function MbNavBar() {
  useInjectReducer({ key: 'mbNavBar', reducer });
  const [cookie] = useCookies(['user']);

  return (
    <>
      <Navbar className="navbar-top navbar-expand border-bottom">
        <Container fluid>
          <Collapse navbar isOpen>
            <Nav className="d-flex w-100" pills>
              <NavItem>
                <NavLink
                  active={window.location.pathname.startsWith('/dashboard')}
                  onClick={() => history.push('/dashboard')}
                  href="#"
                >
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={window.location.pathname.startsWith('/party')}
                  onClick={() => history.push('/party')}
                  href="#"
                >
                  Parties
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={window.location.pathname.startsWith('/product')}
                  onClick={() => history.push('/product')}
                  href="#"
                >
                  Products
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={window.location.pathname.startsWith('/transaction')}
                  onClick={() => history.push('/transaction')}
                  href="#"
                >
                  Transactions
                </NavLink>
              </NavItem>
            </Nav>
            <Nav
              className="align-items-center justify-content-end w-100"
              navbar
            >
              <UncontrolledDropdown nav className="ml-0">
                <DropdownToggle
                  className="nav-link d-flex align-items-middle hover-pointer"
                  color=""
                  tag="a"
                >
                  <span className="mx-2 text-primary font-weight-bold">
                    {selectors.getName(cookie)}
                  </span>
                  <a className="avatar avatar-sm rounded-circle" href="#pablo">
                    <i className="ni ni-circle-08 text-primary text-xl pt-1" />
                  </a>
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-sm text-sm py-0 overflow-hidden"
                  end
                >
                  <ListGroup flush>
                    <ListGroupItem
                      className="px-2 py-2 hover-pointer"
                      onClick={() => history.push('/logout')}
                    >
                      Logout
                    </ListGroupItem>
                  </ListGroup>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MbNavBar;
