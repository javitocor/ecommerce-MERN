/* eslint-disable consistent-return */
import 'regenerator-runtime/runtime';
import { URL_BASIC } from '../constants/constants';
import authHeader from "./authHeader";

async function getProducts (productId) {
  const Url = `${`${URL_BASIC}products`}`;
  try {
    const response = await fetch(`${Url}/${productId}`, { mode: 'cors',   headers: authHeader() });
    const data = await response.json();
    return data;
  } catch(error) {
    console.log(error);
  }  
};

export default getProducts;