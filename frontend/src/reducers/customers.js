/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import {
  initialStateCustomers,
  GET_ALL_CUSTOMERS, CUSTOMERS_PENDING, CUSTOMERS_ERROR,
  GET_SINGLE_CUSTOMER, CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER,
} from '../constants/constants';

const customerReducer = (state = initialStateCustomers, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS:
      return {
        ...state,
        pending: false,
        customersList: action.customersList,
      };
    case CUSTOMERS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case CUSTOMERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }; 
    case GET_SINGLE_CUSTOMER:
      return {
        ...state,
        pending: false,
        customer: action.customer,
      };
    case CREATE_CUSTOMER:
      return {
        ...state,
        pending: false,
        customersList: [...state.customersList, action.customer],
        customer: action.customer,
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        pending: false,
        customersList: state.customersList.map(customer => {
          customer._id === action.id ? customer = action.customer : customer
        }),
        customer: action.customer
      }; 
    case DELETE_CUSTOMER:
      return {
        ...state,
        pending: false,
        customersList: state.customersList.filter(customer => customer._id !== action.id),
        customer: {},
      }; 
    default:
      return state;
  }
};

export default customerReducer;