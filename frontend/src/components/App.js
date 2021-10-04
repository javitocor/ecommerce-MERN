import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import NavBar from "../containers/NavBar";
import Home from '../containers/Home';
import ProductDetail from '../containers/ProductDetail';
import Checkout from '../containers/Checkout';
import PreCheckout from './PreCheckout';
import Cart from '../containers/Cart';
import Profile from '../containers/Profile';
import AdminPanel from '../containers/AdminPanel';
import ProtectedRoute from '../containers/ProtectedRoute';
import history from '../history';

const App = () => (
  <Router history={history}>
    <Switch>
      <>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:name" component={ProductDetail} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/precheckout" component={PreCheckout} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/customer/:name" component={Profile} />
        <ProtectedRoute exact path="/adminPanel" component={AdminPanel} />
      </>
    </Switch>
  </Router>
);

export default App;