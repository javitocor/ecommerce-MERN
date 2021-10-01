import {
  GET_ALL_ORDERS, ORDERS_PENDING, ORDERS_ERROR,
  GET_SINGLE_ORDER, CREATE_ORDER, UPDATE_ORDER, DELETE_ORDER,
} from '../constants/constants';

export const getAllOrders = ordersList => ({
  type: GET_ALL_ORDERS,
  ordersList,
});

export const getSingleOrder = order => ({
  type: GET_SINGLE_ORDER,
  order,
});

export const createOrder = order => ({
  type: CREATE_ORDER,
  order
});

export const updateOrder = (order, id) => ({
  type: UPDATE_ORDER,
  order,
  id,
});

export const deleteOrder = id => ({
  type: DELETE_ORDER,
  id
});

export const ordersError = error => ({
  type: ORDERS_ERROR,
  error,
});

export const ordersPending = () => ({
  type: ORDERS_PENDING,
});