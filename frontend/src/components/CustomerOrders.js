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
            {orders.length === 0 
            ? (
              <div className="d-flex justify-content-center align-items-center w-100">
                <h3>No Orders</h3>
              </div>
              )
            :orders.map(order=>(
              <div key={order._id} className={style.nearbyuser}>
                <div className="row w-100 d-flex flex-row justify-content-between align-items-center">
                  <div className="col-md-8 col-sm-8">
                    <h5>
                      <a href="#" className="profile-link">
                        Order ID:
                        {' '}
                        {order.order._id}
                      </a>
                    </h5>
                    <p className={order.order.complete ? 'text-success' : 'text-warning'}>
                      Status:
                      {' '}
                      {order.order.complete ? 'Complete' : 'Pending'}
                    </p>
                    <p>
                      Shipping:
                      {' '}
                      {order.shipping.name}
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
                    <p className="text-muted">
                      Date:
                      {' '}
                      {order.order.date_order.substring(0, 10)}
                    </p>
                  </div>
                  <div className="col-md-4 col-sm-4 d-flex flex-column justify-content-center align-items-center">
                    <Link
                      to={{
                        pathname: `/order/${order.order._id}`,
                        state: { 
                          id: order.order._id,
                          totalItems: order.totalItems,
                          totalAmount: order.totalAmount,
                          shippingId: order.shipping._id,
                         }
                      }}
                      className="btn btn-info mb-3"
                      id="list-home-list"
                      data-toggle="list"
                      role="tab"
                      aria-controls="home"
                    >
                      <i className="fas fa-receipt" />
                      {' '}
                      Go to Order
                    </Link>
                    <button className="btn btn-danger" onClick={()=>remove('orders', order._id)}>
                      <i className="fas fa-window-close" />
                      {' '}
                      Cancel Order
                    </button>
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