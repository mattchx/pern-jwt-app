import React, { Fragment } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fragment>
        <Router>
          <Switch>
            <Route exact 
            path="/login" 
            render={props => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              render={props => <Register {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={props => <Dashboard {...props} />}
            />
          </Switch>
        </Router>
      </Fragment>
    </ChakraProvider>
  );
}

export default App;
