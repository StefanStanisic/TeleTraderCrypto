import React, { Fragment, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import HomePage from '../../pages/homepage/homepage.component';
import ProfilePage from '../../pages/profile/profile.component';

import {Navbar, Nav, Button} from 'react-bootstrap'

const NavigationBar = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const loginUser = () => {
    setUserLoggedIn(!userLoggedIn);
  }

  return (
    <Router>
      <Fragment>  
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Teletrader Crypto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} exact={`true`} to="/">Home</Nav.Link>
              {
                !userLoggedIn ? <Redirect to="/" /> : <Nav.Link as={Link} exact={`true`} to="/profile">Profile</Nav.Link>
              }
            </Nav>
            {
              !userLoggedIn && <Button onClick={loginUser}>Login</Button>
            }
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