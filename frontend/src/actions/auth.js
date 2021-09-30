import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants/constants";

export const signup = () => {
  return {
    type: REGISTER_SUCCESS,    
  };
};

export const signupFailed = () => {
  return {
    type: REGISTER_FAIL,    
  };
};

export const login = (customer) => {
  return {
    type: LOGIN_SUCCESS,    
    customer
  };
};

export const loginFailed = () => {
  return {
    type: LOGIN_FAIL,    
  };
};

export const logout = () => {
  return {
    type: LOGOUT,    
  };
};



