/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import {shippingAddressByCustomer} from '../helpers/apiCalls';
import style from '../style/CheckoutFormCustomer.module.css';


const CheckoutFormCustomer = props => {
  const {getAddress, auth, shippingAddress} = props;
  const {customer} = auth;
  const {shippingList} = shippingAddress;

  useEffect(() => {
    (async () => {
      try {
        await getAddress(customer.customer._id);
      } catch (error) {
        console.log(error)
      }           
    })();
  }, []);

  return (

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