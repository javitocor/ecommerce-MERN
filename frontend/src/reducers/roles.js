/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import {
  initialStateRoles,
  GET_ALL_ROLES, ROLES_PENDING, ROLES_ERROR,
  GET_SINGLE_ROLE, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE,
} from '../constants/constants';

const roleReducer = (state = initialStateRoles, action) => {
  switch (action.type) {
    case GET_ALL_ROLES:
      return {
        ...state,
        pending: false,
        rolesList: action.rolesList,
      };
    case ROLES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case ROLES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }; 
    case GET_SINGLE_ROLE:
      return {
        ...state,
        pending: false,
        role: action.role,
      };
    case CREATE_ROLE:
      return {
        ...state,
        pending: false,
        rolesList: [...state.rolesList, action.role],
        role: action.role,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        pending: false,
        rolesList: state.rolesList.map(role => {
          role._id === action.id ? role = action.role : role
        }),
        role: action.role
      }; 
    case DELETE_ROLE:
      return {
        ...state,
        pending: false,
        rolesList: state.rolesList.filter(role => role._id !== action.id),
        role: {},
      }; 
    default:
      return state;
  }
};

export default roleReducer;