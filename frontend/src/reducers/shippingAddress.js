/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import {
  initialStateShippingAddresses,
  GET_ALL_SHIPPING_ADDRESSES, SHIPPING_ADDRESSES_PENDING, SHIPPING_ADDRESSES_ERROR,
  GET_SINGLE_SHIPPING_ADDRESS, CREATE_SHIPPING_ADDRESS, UPDATE_SHIPPING_ADDRESS, DELETE_SHIPPING_ADDRESS,
} from '../constants/constants';

const shippingAddressReducer = (state = initialStateShippingAddresses, action) => {
  switch (action.type) {
    case GET_ALL_SHIPPING_ADDRESSES:
      return {
        ...state,
        pending: false,
        shippingAddressesList: action.shippingAddressesList,
      };
    case SHIPPING_ADDRESSES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case SHIPPING_ADDRESSES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }; 
    case GET_SINGLE_SHIPPING_ADDRESS:
      return {
        ...state,
        pending: false,
        shippingAddress: action.shippingAddress,
      };
    case CREATE_SHIPPING_ADDRESS:
      return {
        ...state,
        pending: false,
        shippingAddressesList: [...state.shippingAddressesList, action.shippingAddress],
        shippingAddress: action.shippingAddress,
      };
    case UPDATE_SHIPPING_ADDRESS:
      return {
        ...state,
        pending: false,
        shippingAddressesList: state.shippingAddressesList.map(shippingAddress => {
          shippingAddress._id === action.id ? shippingAddress = action.shippingAddress : shippingAddress
        }),
        shippingAddress: action.shippingAddress
      }; 
    case DELETE_SHIPPING_ADDRESS:
      return {
        ...state,
        pending: false,
        shippingAddressesList: state.shippingAddressesList.filter(shippingAddress => shippingAddress._id !== action.id),
        shippingAddress: {},
      }; 
    default:
      return state;
  }
};

export default shippingAddressReducer;