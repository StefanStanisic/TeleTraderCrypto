import React, { Fragment } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import HomePage from '../../pages/homepage/homepage.component';
import ProfilePage from '../../pages/profile/profile.component';

import {Navbar, Nav, Button} from 'react-bootstrap'

const NavigationBar = () => {
  return (
    <Router>
      <Fragment>  
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/home">Teletrader Crypto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} exact to="/home">Home</Nav.Link>
              <Nav.Link as={Link} exact to="/profile">Profile</Nav.Link>
            </Nav>
            <Button>Login</Button>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
      <Switch>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
    </Router>
  )
};

export default NavigationBar;