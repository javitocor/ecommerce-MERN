import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import NavBar from '../containers//NavBar';
import Home from '../containers/Home';
import ProtectedRoute from '../containers/ProtectedRoute';
import history from '../history';

const App = () => (
  <Router history={history}>
    <Switch>
      <>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/" component={} />
      </>
    </Switch>
  </Router>
);

export default App;