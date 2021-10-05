/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const CustomerOrders = props => {
  const {orders, remove} = props;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="people-nearby">
            {orders.map(order=>(
              <div className="nearby-user">
                <div className="row">
                  <div className="col-md-2 col-sm-2">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" className="profile-photo-lg" />
                  </div>
                  <div className="col-md-7 col-sm-7">
                    <h5><a href="#" className="profile-link">{order._id}</a></h5>
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
                  <div className="col-md-3 col-sm-3">
                    <button className="btn btn-primary pull-right" onClick={remove('orders', order._id)}>Cancel</button>
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