/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import {
  initialStateOrders,
  GET_ALL_ORDERS, ORDERS_PENDING, ORDERS_ERROR,
  GET_SINGLE_ORDER, CREATE_ORDER, UPDATE_ORDER, DELETE_ORDER,
} from '../constants/constants';

const orderReducer = (state = initialStateOrders, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        pending: false,
        ordersList: action.ordersList,
      };
    case ORDERS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ORDERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }; 
    case GET_SINGLE_ORDER:
      return {
        ...state,
        pending: false,
        order: action.order,
      };
    case CREATE_ORDER:
      return {
        ...state,
        pending: false,
        ordersList: [...state.ordersList, action.order],
        order: action.order,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        pending: false,
        ordersList: state.ordersList.map(order => {
          order._id === action.id ? order = action.order : order
        }),
        order: action.order
      }; 
    case DELETE_ORDER:
      return {
        ...state,
        pending: false,
        ordersList: state.ordersList.filter(order => order._id !== action.id),
        order: {},
      }; 
    default:
      return state;
  }
};

export default orderReducer;