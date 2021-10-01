import {
  GET_ALL_PRODUCTS, PRODUCTS_PENDING, PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT,
} from '../constants/constants';

export const getAllProducts = productsList => ({
  type: GET_ALL_PRODUCTS,
  productsList,
});

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product,
});

export const createProduct = product => ({
  type: CREATE_PRODUCT,
  product
});

export const updateProduct = (product, id) => ({
  type: UPDATE_PRODUCT,
  product,
  id,
});

export const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  id
});

export const productsError = error => ({
  type: PRODUCTS_ERROR,
  error,
});

export const productsPending = () => ({
  type: PRODUCTS_PENDING,
});