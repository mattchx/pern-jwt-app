import React, { Fragment, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Fragment>
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                !isAuthenticated ? (
                  <Dashboard {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Router>
      </Fragment>
    </ChakraProvider>
  );
}

export default App;
