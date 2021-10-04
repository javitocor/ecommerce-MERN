/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import {shippingAddressByCustomer} from '../helpers/apiCalls';
import style from '../style/CheckoutFormCustomer.module.css';


const CheckoutFormCustomer = props => {
  const {getAddress, auth, shippingAddress} = props;
  const {customer} = auth;
  const {shippingList} = shippingAddress;
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
      setShipping(event.target.checked)
    }
  }

  return shippingList === undefined ? <div className="d-flex justify-content-center align-items-center w-100"><Spinner animation="grow" /></div> : (
    <div>
      {shippingList.map(address => (
        <div className={`${style.form} ${style.cf} mt-1 mb-1"`}>
          <section className={`${style.plan} ${style.cf} d-flex flex-column"`}>
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
          </section>	
        </div>
      ))}
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
  getAddress: PropTypes.func.isRequired,
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
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAddress: shippingAddressByCustomer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutFormCustomer);