import { GET_COOKIE, UPDATE_COOKIE, DELETE_COOKIE} from '../constants/constants';
import removeCookie from '../helpers/removeCookie';
import bakeCookie from '../helpers/bakeCookie';
import getCookie from '../helpers/getCookie';

export const getCookieData = (name) => {
  const cookie = getCookie(name);
  return {
    type: GET_COOKIE,
    cookie
  };
};

export const deleteCookieData = (name) => {
  removeCookie(name);
  return {
    type: DELETE_COOKIE,
  };
};

export const updateCookieData = (name, value) => {
  const cookie = bakeCookie(name, value);
  return {
    type: UPDATE_COOKIE,
    cookie
  };
};