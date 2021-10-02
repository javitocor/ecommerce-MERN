/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCookieData} from '../actions/cookies';
import CartItem from './CartItem';
import cartData from '../helpers/cartData';
import style from '../style/Cart.module.css';

const Cart = (props) => {
  const {cookies, getCart} = props;
  const {cookie} = cookies;
  const [products, setProducts] = useState({});
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const cart = await getCart('cart');
        const data = await cartData(cart);
        setProducts(data.items);
        setTotal(data.cartItems);
        setOrder(data.order);
      } catch (error) {
        console.log(error)
      }           
    })();
  }, [cookie]);

  return (
    <div className="container">
      <div className="col-md-9 col-sm-8 content">
        <div className="row">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li><a href="#">Home</a></li>
              <li className="active">Cart</li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className={`panel panel-info ${style.panelshadow}`}>
              <div className="panel-heading">
                <h3>
                  <img className="img-circle img-thumbnail" src="https://bootdey.com/img/Content/user_3.jpg" />
                  Matew darfkmoun
                </h3>
              </div>
              <div className="panel-body"> 
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product=>(
                        <CartItem product={product} />
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
            <a href="#" className="btn btn-success">
              <span className="glyphicon glyphicon-arrow-left" />
                &nbsp;Continue Shopping
            </a>
            <a href="#" className="btn btn-primary pull-right">
              Checkout
              <span className="glyphicon glyphicon-chevron-right" />
            </a>
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
  getCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cookies: {
    cookie: state.cookies.cookie,
  },  
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCart: getCookieData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);