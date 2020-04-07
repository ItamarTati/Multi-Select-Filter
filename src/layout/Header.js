import React, { Component } from 'react';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <Navbar dark className="navbar-dark bg-dark">
        <NavbarBrand tag={RouterNavLink} to="/">Overloop</NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink tag={RouterNavLink} to="/articles/">Articles</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
