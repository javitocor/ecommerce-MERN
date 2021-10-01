import {
  GET_ALL_ORDERITEMS, ORDERITEMS_PENDING, ORDERITEMS_ERROR,
  GET_SINGLE_ORDERITEM, CREATE_ORDERITEM, UPDATE_ORDERITEM, DELETE_ORDERITEM,
} from '../constants/constants';

export const getAllOrderItems = orderItemsList => ({
  type: GET_ALL_ORDERITEMS,
  orderItemsList,
});

export const getSingleOrderItem = orderItem => ({
  type: GET_SINGLE_ORDERITEM,
  orderItem,
});

export const createOrderItem = orderItem => ({
  type: CREATE_ORDERITEM,
  orderItem
});

export const updateOrderItem = (orderItem, id) => ({
  type: UPDATE_ORDERITEM,
  orderItem,
  id,
});

export const deleteOrderItem = id => ({
  type: DELETE_ORDERITEM,
  id
});

export const orderItemsError = error => ({
  type: ORDERITEMS_ERROR,
  error,
});

export const orderItemsPending = () => ({
  type: ORDERITEMS_PENDING,
});