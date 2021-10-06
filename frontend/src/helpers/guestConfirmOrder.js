/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import {CreateCall, UpdateCall} from './apiCalls';
import {customerSignup, customerLogin} from '../AuthenticationServices/authService';
import cartData from './cartData';
import { updateCustAuth } from '../actions/auth';

const guestConfirmOrder = (state, token, cookie) => async dispatch => {
  try {
    const custData = {
      firstname: state.firstname,
      lastname: state.lastname,
      username: state.username,
      phone: state.phone,
      email: state.email,
    };
    // signup and login new customer
    await dispatch(customerSignup(state.username, state.email, state.password));
    const customer = await dispatch(customerLogin(state.email, state.password));
    await dispatch(UpdateCall('customers', token, custData, customer.customer._id));
    // create order
    const order = await dispatch(CreateCall('orders', token, {}));
    // create shipping 
    const shippingData = {
      address: state.address,
      city: state.city,
      state: state.state,
      zipcode: state.zipcode,
      country: state.country,
      name: 'default',
      customer: customer.customer._id,
      order: order.order._id,
    };
    const shipping = await dispatch(CreateCall('shippingAddress', token, shippingData));
    // create order items
    const cartObject = await cartData(cookie);
    for (const element of cartObject.items) {
      const temp = {
        product: element._id,
        order: order.order._id,
        quantity: element.quantity,
      }
      const a = await dispatch(CreateCall('orderItems', token, temp));
    }
    return customer;
  } catch (err) {
    console.log(err)
  }

}

export default guestConfirmOrder;