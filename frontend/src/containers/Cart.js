/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {getCookieData, updateCookieData} from '../actions/cookies';
import CartItem from '../components/CartItem';
import cartData from '../helpers/cartData';
import style from '../style/Cart.module.css';

const Cart = (props) => {
  const {cookies, getCart, updateCart} = props;
  const {cookie} = cookies;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({});
  const [rerender, setRerender] = useState(false);

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
  }, [rerender]);

  function update(productId, quantity){
    updateCart('cart', productId, parseInt(quantity));
    setRerender(!rerender);        
  }

  function deleteProduct(productId){
    updateCart('cart', productId, 0);
    setRerender(!rerender);
  }
  
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-9 col-sm-8 mt-5 d-flex flex-column align-items-center justify-content-end w-100">
        <div className="row w-100">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li>
                <Link
                  to='/'
                  className=""
                  id="list-home-list"
                  data-toggle="list"
                  role="tab"
                  aria-controls="home"
                >
                  Home
                  {' '}
                </Link>
              </li>
              <li className="active">
                /
                {' '}
                {' '}
                Cart
              </li>
            </ol>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-md-12">
            <div className={`card ${style.panelshadow}`}>
              <div className="card-header">
                <h3>
                  <img className="rounded img-thumbnail mr-4" src="https://bootdey.com/img/Content/user_3.jpg" />
                  {props.auth.customer.username ? props.auth.customer.username : 'Anonymous Customer'}
                </h3>
              </div>
              <div className="card-body"> 
                <div className="table">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products && products.map(product=>(
                        <CartItem key={product._id} product={product} handleQuantity={update} deleteProduct={deleteProduct} />
                      ))}  
                      <tr>
                        <td colSpan="6">&nbsp;</td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-right">Total Product</td>
                        <td>
                          $
                          {order.get_cart_total}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-right">Total Shipping</td>
                        <td>
                          $
                          0.00
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-right">Total Items</td>
                        <td>{total}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" className="text-right"><strong>Total</strong></td>
                        <td>
                          $
                          {order.get_cart_total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="w-100 mt-3 d-flex flex-row aliggn-items-center justify-content-between mb-3">
              <Link
                to='/'
                className="btn btn-success"
                id="list-home-list"
                data-toggle="list"
                role="tab"
                aria-controls="home"
              >
                <span className="glyphicon glyphicon-arrow-left" />
                Continue Shopping
              </Link>
              <Link
                to='/checkout'
                className="btn btn-primary pull-right"
                id="list-home-list"
                data-toggle="list"
                role="tab"
                aria-controls="home"
              >
                Checkout
                <span className="glyphicon glyphicon-chevron-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

Cart.propTypes = {
  cookies: PropTypes.shape({
    cookie: PropTypes.object,
  }).isRequired,  
  auth: PropTypes.shape({
    customer: PropTypes.object,
  }).isRequired,  
  getCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cookies: {
    cookie: state.cookies.cookie,
  },
  auth: {
    customer: state.auth.customer
  }  
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCart: updateCookieData,
  getCart: getCookieData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);