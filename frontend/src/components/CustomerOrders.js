/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import style from '../style/CustomerOrders.module.css';

const CustomerOrders = props => {
  const {orders, remove} = props;
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className={style.peoplenearby}>
            {orders.map(order=>(
              <div className={style.nearbyuser}>
                <div className="row w-100 d-flex flex-row justify-content-between align-items-center">
                  <div className="col-md-8 col-sm-8">
                    <h5>
                      <a href="#" className="profile-link">
                        Order ID:
                        {' '}
                        {order._id}
                      </a>
                    </h5>
                    <p className={order.complete ? 'text-success' : 'text-warning'}>
                      Status:
                      {' '}
                      {order.complete ? 'Complete' : 'Pending'}
                    </p>
                    <p>
                      Shipping:
                      {' '}
                      {order.shipping}
                    </p>
                    <p className="text-muted">
                      Total Items:
                      {' '}
                      {order.totalItems}
                    </p>
                    <p className="text-muted">
                      Total Amount:
                      {' '}
                      {order.totalAmount}
                    </p>
                  </div>
                  <div className="col-md-4 col-sm-4 d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-info mb-3">Go to Order</button>
                    <button className="btn btn-danger" onClick={()=>remove('orders', order._id)}>Cancel Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

CustomerOrders.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
};

export default CustomerOrders;