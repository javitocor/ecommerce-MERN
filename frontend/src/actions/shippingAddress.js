import {
  GET_ALL_SHIPPING_ADDRESSES, SHIPPING_ADDRESSES_PENDING, SHIPPING_ADDRESSES_ERROR,
  GET_SINGLE_SHIPPING_ADDRESS, CREATE_SHIPPING_ADDRESS, UPDATE_SHIPPING_ADDRESS, DELETE_SHIPPING_ADDRESS,
} from '../constants/constants';

export const getAllShippingAddresses = shippingAddressesList => ({
  type: GET_ALL_SHIPPING_ADDRESSES,
  shippingAddressesList,
});

export const getSingleShippingAddress = singleShippingAddress => ({
  type: GET_SINGLE_SHIPPING_ADDRESS,
  singleShippingAddress,
});

export const createShippingAddress = shippingAddress => ({
  type: CREATE_SHIPPING_ADDRESS,
  shippingAddress
});

export const updateShippingAddress = (shippingAddress, id) => ({
  type: UPDATE_SHIPPING_ADDRESS,
  shippingAddress,
  id,
});

export const deleteShippingAddress = id => ({
  type: DELETE_SHIPPING_ADDRESS,
  id
});

export const shippingAddressesError = error => ({
  type: SHIPPING_ADDRESSES_ERROR,
  error,
});

export const shippingAddressesPending = () => ({
  type: SHIPPING_ADDRESSES_PENDING,
});