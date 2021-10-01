import {
  GET_ALL_CUSTOMERS, CUSTOMERS_PENDING, CUSTOMERS_ERROR,
  GET_SINGLE_CUSTOMER, CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER,
} from '../constants/constants';

export const getAllCustomers = customersList => ({
  type: GET_ALL_CUSTOMERS,
  customersList,
});

export const getSingleCustomer = customer => ({
  type: GET_SINGLE_CUSTOMER,
  customer,
});

export const createCustomer = customer => ({
  type: CREATE_CUSTOMER,
  customer
});

export const updateCustomer = (customer, id) => ({
  type: UPDATE_CUSTOMER,
  customer,
  id,
});

export const deleteCustomer = id => ({
  type: DELETE_CUSTOMER,
  id
});

export const customersError = error => ({
  type: CUSTOMERS_ERROR,
  error,
});

export const customersPending = () => ({
  type: CUSTOMERS_PENDING,
});