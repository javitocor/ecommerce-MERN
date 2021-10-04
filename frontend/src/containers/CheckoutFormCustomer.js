/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import CustomerFormAddShipping from './CustomerFormAddShipping';
import {shippingAddressByCustomer, CreateCall, UpdateCall} from '../helpers/apiCalls';
import cartData from '../helpers/cartData';
import style from '../style/CheckoutFormCustomer.module.css';


const CheckoutFormCustomer = props => {
  const {getAddress, auth, shippingAddress, createInstance, updateInstance, cookies, history} = props;
  const {cookie} = cookies;
  const {customer} = auth;
  const {shippingList, pending} = shippingAddress;
  const [shipping, setShipping] = useState();

  useEffect(() => {
    (async () => {
      try {
        await getAddress(customer.customer._id);
      } catch (error) {
        console.log(error)
      }           
    })();
  }, []);

  function handleChange (event) {
    if (event.target.name === 'shippingAddress') {
      setShipping(event.target.checked);
    }
  }

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

  async function proceed(addressId) {
    const token = getCookie('csrftoken');
    const order = await createInstance('orders', token, {});
    const shipping = await updateInstance('shippingAddress', token, {order: order._id}, addressId);
    const cartObject = cartData(cookie);
    for(let i; i < cartObject.items; i++) {
      const temp = {
        product: cartObject.items[i]._id,
        order: order.order._id,
        quantity: cartObject.items[i].quantity,
      }
      await createInstance('orderItems', token, temp);
    }
    history.push(
      {
        pathname: `/customer/${customer.customer.name}`,
        state: { id: customer.customer._id }
      }
    )
  };

  function handleSubmit(e) {
    e.preventDefault();
    proceed(shipping);
  }

  

  return pending ? <div className="d-flex justify-content-center align-items-center w-100"><Spinner animation="grow" /></div> : (
    <div>
      {shippingList.length === 0 
      ? <CustomerFormAddShipping proceed={proceed} /> 
      : (
        <form className={`${style.form} ${style.cf} mt-1 mb-1"`} onSubmit={handleSubmit}>
          <section className={`${style.plan} ${style.cf} d-flex flex-column"`}>
            {shippingList.map(address => (
              <>
                <input type="radio" name="shippingAddress" id="free" value={address._id} onChange={handleChange} checked={shipping === address._id} />
                <label className="d-flex flex-row justify-content-between align-items-center" htmlFor="free">
                  <div className="left">{address.name}</div>
                  <div className="center">
                    <div className="row text-left h-100">
                      <div className="col-3">
                        Address:
                      </div>
                      <div className="col-9">
                        {address.address}
                      </div>
                      <div className="col-3">
                        City:
                      </div>
                      <div className="col-9">
                        {address.city}
                      </div>
                      <div className="col-3">
                        State:
                      </div>
                      <div className="col-9">
                        {address.state}
                      </div>
                      <div className="col-3">
                        Country:
                      </div>
                      <div className="col-9">
                        {address.country}
                      </div>
                      <div className="col-3">
                        Zip Code:
                      </div>
                      <div className="col-9">
                        {address.zipcode}
                      </div>
                    </div>
                  </div>
                </label>
              </>
            ))}
          </section>
          <button type='submit' className="btn btn-primary">Buy Items</button>	
        </form>
)
      }
    </div>
  );
};

CheckoutFormCustomer.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool,
    customer: PropTypes.object,
  }).isRequired,
  shippingAddress: PropTypes.shape({
    error: PropTypes.object,
    pending: PropTypes.bool,
    shippingList: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  cookies: PropTypes.shape({
    cookie: PropTypes.object,
  }).isRequired,
  getAddress: PropTypes.func.isRequired,
  createInstance: PropTypes.func.isRequired,
  updateInstance: PropTypes.func.isRequired
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
  cookies: {
    cookie: state.cookies.cookie,
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAddress: shippingAddressByCustomer,
  createInstance: CreateCall,
  updateInstance: UpdateCall,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutFormCustomer);