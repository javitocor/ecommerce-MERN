/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-empty */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import CheckoutFormGuest from './CheckoutFormGuest';
import CheckoutFormCustomer from './CheckoutFormCustomer';
import {getCookieData} from '../actions/cookies';
import cartData from '../helpers/cartData';
import generateKey from '../helpers/generateKey';
import style from '../style/Checkout.module.css';

const Checkout = props => {
  const {cookies, getCart, auth} = props;
  const {loggedIn} = auth;
  const {cookie} = cookies;
  const [products, setProducts] = useState([]);
  const [totalItems, setTotal] = useState(0);
  const [order, setOrder] = useState({});
  
  useEffect(() => {
    (async () => {
      try {
        await getCart('cart');
        const data = await cartData(cookie);
        setProducts(data.items);
        setTotal(data.cartItems);
        setOrder(data.order);
      } catch (error) {
        console.log(error)
      }           
    })();
  }, []);

  return (
    <main className="mt-2 pt-3">
      <div className="container">
        <h2 className="my-5 h2 text-center">{loggedIn ? 'Checkout Info': 'Checkout form'}</h2>
        <div className="row">
          <div className={`col-md-8 mb-4 ${style.shadow}`}>
            {loggedIn 
            ? <CheckoutFormCustomer />
            : <CheckoutFormGuest  />
            } 
          </div>
          <div className="col-md-4 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-info badge-pill">{totalItems}</span>
            </h4>
            <ul className={`list-group mb-3 z-depth-1 ${style.shadowcart}`}>
              {products && products.map(product =>(
                <li key={`${product._id}as`} className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">
                      {product.product.name.substr(0, 19)}
                      ...
                    </h6>
                    <small className="text-muted">
                      Quantity:
                      {' '}
                      {product.quantity}
                    </small>
                  </div>
                  <span className="text-muted">
                    $
                    {product.get_total}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Promo code</h6>
                  <small>NO CODE</small>
                </div>
                <span className="text-success">-$0</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>
                  $
                  {order.get_cart_total}
                </strong>
              </li>
            </ul>  
          </div>
        </div>
      </div>
      
    </main>
  ); 
};

Checkout.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  cookies: PropTypes.shape({
    cookie: PropTypes.object,
  }).isRequired,
  getCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: {
    loggedIn: state.auth.loggedIn,
    customer: state.auth.customer,
  },
  cookies: {
    cookie: state.cookies.cookie,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCart: getCookieData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);