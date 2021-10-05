/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import {shippingAddressByCustomer, ordersByCustomer, SingleCall, DeleteCall} from '../helpers/apiCalls';
import CustomerOrders from '../components/CustomerOrders';
import CustomerShippingAddress from '../components/CustomerShippingAddresses';
import style from '../style/Profile.module.css';

const Profile = props => {
  const {location, auth, orders, shippingAddress, getOrders, getShipping, getCustomer, deleteInstance } = props;
  const {id} = location.state;
  const {customer} = auth;
  const {ordersList} = orders;
  const {shippingList} = shippingAddress;

  useEffect(() => {
    (async () => {
      try {
        await getCustomer('customers', id);
        await getOrders(id);
        await getShipping(id);
      } catch (error) {
        console.log(error)
      }           
    })();
  }, []);

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (`${name  }=`)) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  async function removeInstance(route, instanceId) {
    const token = getCookie('csrftoken');
    await deleteInstance(route, token, instanceId)
  }

  return customer === undefined ? <div className="d-flex justify-content-center align-items-center w-100"><Spinner animation="grow" /></div> : (
    <div className={`container ${style.empprofile}`}>
      <div>
        <div className="row">
          <div className="col-md-4">
            <div className={style.profileimg}>
              <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" />
                      
            </div>
          </div>
          <div className="col-md-6">
            <div className={style.profilehead}>
              <h5>
                {customer.customer.username}
              </h5>
              <h6>
                Since: 
                {' '}
                {customer.customer.created_at}
              </h6>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="orders-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="orders" aria-selected="true">Orders</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="shipping-tab" data-toggle="tab" href="#shipping" role="tab" aria-controls="shipping" aria-selected="false">Shipping Addresses</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <input type="submit" className={style.profileeditbtn} name="btnAddMore" value="Edit Profile" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className={style.profilework}>
              <div className="row">
                <div className="col-md-6">
                  <label>Name</label>
                </div>
                <div className="col-md-6">
                  <p>
                    {customer.customer.firstname} 
                    {' '}
                    {customer.customer.lastname}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Email</label>
                </div>
                <div className="col-md-6">
                  <p>{customer.customer.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Phone</label>
                </div>
                <div className="col-md-6">
                  <p>{customer.customer.phone}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Role</label>
                </div>
                <div className="col-md-6">
                  <p>{customer.role}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className={`tab-content ${style.profiletab}`} id="myTabContent">
              <div className="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                <CustomerOrders orders={ordersList} remove={removeInstance} />
              </div>
              <div className="tab-pane fade" id="shipping" role="tabpanel" aria-labelledby="shipping-tab">
                <CustomerShippingAddress addresses={shippingList} remove={removeInstance} />
              </div>
            </div>
          </div>
        </div>
      </div>           
    </div>
  );
};

Profile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  orders: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    ordersList: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  shippingAddress: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    shippingList: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  getOrders: PropTypes.func.isRequired,
  getShipping: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
  deleteInstance: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: {
    loggedIn: state.auth.loggedIn,
    customer: state.auth.customer,
  },
  shippingAddress: {
    pending: state.shippingAddress.pending,
    error: state.shippingAddress.error,
    shippingList: state.shippingAddress.shippingList,
  }, 
  orders: {
    pending: state.orders.pending,
    error: state.orders.error,
    ordersList: state.orders.ordersList,
  }, 
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrders: ordersByCustomer,
  getShipping: shippingAddressByCustomer,
  getCustomer: SingleCall,
  deleteInstance: DeleteCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);