/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import NavBar from "../containers/NavBar";
import Home from '../containers/Home';
import ProductDetail from '../containers/ProductDetail';
import Checkout from '../containers/Checkout';
import PreCheckout from '../containers/PreCheckout';
import Cart from '../containers/Cart';
import Profile from '../containers/Profile';
import AdminPanel from '../containers/AdminPanel';
import NotFound from './NotFound';
import ProtectedRoute from '../containers/ProtectedRoute';
import { clearMessage } from "../actions/message";
import history from '../history';


class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <>
            <Route path="/" component={NavBar} />
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/product/:name" component={ProductDetail} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/precheckout" component={PreCheckout} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <ProtectedRoute exact path="/customer/:name" component={Profile} />
            <ProtectedRoute exact path="/adminPanel" component={AdminPanel} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </>
        </Switch>
      </Router>
    )
  }
};

export default App;