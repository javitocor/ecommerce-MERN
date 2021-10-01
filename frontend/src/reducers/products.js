/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import {
  initialStateProducts,
  GET_ALL_PRODUCTS, PRODUCTS_PENDING, PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT,
} from '../constants/constants';

const productReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        pending: false,
        productsList: action.productsList,
      };
    case PRODUCTS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }; 
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        pending: false,
        product: action.product,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        pending: false,
        productsList: [...state.productsList, action.product],
        product: action.product,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        pending: false,
        productsList: state.productsList.map(product => {
          product._id === action.id ? product = action.product : product
        }),
        product: action.product
      }; 
    case DELETE_PRODUCT:
      return {
        ...state,
        pending: false,
        productsList: state.productsList.filter(product => product._id !== action.id),
        product: {},
      }; 
    default:
      return state;
  }
};

export default productReducer;