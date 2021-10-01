/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import {
  initialStateOrderItems,
  GET_ALL_ORDERITEMS, ORDERITEMS_PENDING, ORDERITEMS_ERROR,
  GET_SINGLE_ORDERITEM, CREATE_ORDERITEM, UPDATE_ORDERITEM, DELETE_ORDERITEM,
} from '../constants/constants';

const orderItemReducer = (state = initialStateOrderItems, action) => {
  switch (action.type) {
    case GET_ALL_ORDERITEMS:
      return {
        ...state,
        pending: false,
        orderItemsList: action.orderItemsList,
      };
    case ORDERITEMS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ORDERITEMS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }; 
    case GET_SINGLE_ORDERITEM:
      return {
        ...state,
        pending: false,
        orderItem: action.orderItem,
      };
    case CREATE_ORDERITEM:
      return {
        ...state,
        pending: false,
        orderItemsList: [...state.orderItemsList, action.orderItem],
        orderItem: action.orderItem,
      };
    case UPDATE_ORDERITEM:
      return {
        ...state,
        pending: false,
        orderItemsList: state.orderItemsList.map(orderItem => {
          orderItem._id === action.id ? orderItem = action.orderItem : orderItem
        }),
        orderItem: action.orderItem
      }; 
    case DELETE_ORDERITEM:
      return {
        ...state,
        pending: false,
        orderItemsList: state.orderItemsList.filter(orderItem => orderItem._id !== action.id),
        orderItem: {},
      }; 
    default:
      return state;
  }
};

export default orderItemReducer;