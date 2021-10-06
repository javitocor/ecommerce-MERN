import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_AUTH_CUSTOMER,
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

export const updateCustAuth = customer => {
  return {
    type: UPDATE_AUTH_CUSTOMER,
    customer
  }
}



