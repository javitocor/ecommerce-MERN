/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import {
  initialStateCategories,
  GET_ALL_CATEGORIES, CATEGORIES_PENDING, CATEGORIES_ERROR,
  GET_SINGLE_CATEGORY, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY,
} from '../constants/constants';

const categoryReducer = (state = initialStateCategories, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        pending: false,
        categorysList: action.categorysList,
      };
    case CATEGORIES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case CATEGORIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }; 
    case GET_SINGLE_CATEGORY:
      return {
        ...state,
        pending: false,
        category: action.category,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        pending: false,
        categorysList: [...state.categorysList, action.category],
        category: action.category,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        pending: false,
        categorysList: state.categorysList.map(category => {
          category._id === action.id ? category = action.category : category
        }),
        category: action.category
      }; 
    case DELETE_CATEGORY:
      return {
        ...state,
        pending: false,
        categorysList: state.categorysList.filter(category => category._id !== action.id),
        category: {},
      }; 
    default:
      return state;
  }
};

export default categoryReducer;