import {
  initialStateAuth, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from '../constants/constants';



const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        customer: action.customer,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        customer: null,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        customer: null,
      };
    default:
      return state;
  }
}

export default authReducer;