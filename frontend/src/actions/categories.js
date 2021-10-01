import {
  GET_ALL_CATEGORIES, CATEGORIES_PENDING, CATEGORIES_ERROR,
  GET_SINGLE_CATEGORY, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,
} from '../constants/constants';

export const getAllCategories = categoriesList => ({
  type: GET_ALL_CATEGORIES,
  categoriesList,
});

export const getSingleCategory = category => ({
  type: GET_SINGLE_CATEGORY,
  category,
});

export const createCategory = category => ({
  type: CREATE_CATEGORY,
  category
});

export const updateCategory = (category, id) => ({
  type: UPDATE_CATEGORY,
  category,
  id,
});

export const deleteCategory = id => ({
  type: DELETE_CATEGORY,
  id
});

export const categoriesError = error => ({
  type: CATEGORIES_ERROR,
  error,
});

export const categoriesPending = () => ({
  type: CATEGORIES_PENDING,
});