/* eslint-disable consistent-return */
import { URL_BASIC } from '../constants/constants';
import {signup, signupFailed, login, loginFailed, logout} from '../actions/auth';
import {setMessage} from '../actions/message';
import addCustomer from '../helpers/addCustomer';
import removeLocalStorage from '../helpers/removeLocalStorage';

export const customerSignup = (username, email, password) =>async (dispatch) => {
  const Url = URL_BASIC;  
  try {  
    const newCustomer = {
      username,
      email,
      password,
    };  
    const response = await fetch(`${Url}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(newCustomer),
    });      
    const data = await response.json();
    dispatch(signup())
    dispatch(setMessage(data.message))
    return data;
  } catch (error) {
    console.log(error);
    dispatch(signupFailed())
    dispatch(setMessage(error))
  }
};

export const customerLogin = (email, password) => async (dispatch) => {
  const Url = URL_BASIC;  
  try {  
    const loginData = {
      email,
      password,
    };  
    const response = await fetch(`${Url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(loginData),
    });      
    const data = await response.json();
    if (data.accessToken) {
      addCustomer(data);
      dispatch(login(data));
    }
    return data;
  } catch (error) {
    console.log(error);
    dispatch(loginFailed());
    dispatch(setMessage(error))
  }
};

export const customerLogout = (customer) => (dispatch) => {
  removeLocalStorage(customer);
  dispatch(logout());  
};
