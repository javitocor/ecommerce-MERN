/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import {CreateCall, UpdateCall} from './apiCalls';
import {customerSignup, customerLogin} from '../AuthenticationServices/authService';
import cartData from './cartData';

async function guestConfirmOrder(state, token, cookie){
  try {
    const custData = {
      firstname: state.firstname,
      lastname: state.lastname,
      username: `${state.firstname}${state.lastname}`,
      password: state.password,
      phone: state.phone,
      email: state.email
    };
    // signup and login new customer
    await customerSignup(`${state.firstname}${state.lastname}`, state.email, state.password);
    const customer = await customerLogin(state.email, state.password);
    await UpdateCall('customers', token, custData, customer.customer._id)
    // create order
    const order = await CreateCall('orders', token, {});
    // create shipping 
    const shippingData = {
      address: state.address,
      city: state.city,
      state: state.state,
      zipcode: state.zipcode,
      customer: customer.customer._id,
      order: order.order._id,
    };
    const shipping = await CreateCall('shippingAddress', token, shippingData);
    // create order items
    const cartObject = cartData(cookie);
    for(let i; i < cartObject.items; i++) {
      const temp = {
        product: cartObject.items[i]._id,
        order: order.order._id,
        quantity: cartObject.items[i].quantity,
      }
      await CreateCall('orderItems', token, temp);
    }
  } catch (err) {
    console.log(err)
  }

}

export default guestConfirmOrder;