/* eslint-disable consistent-return */
import 'regenerator-runtime/runtime';
import { URL_BASIC } from '../constants/constants';
import * as customers from '../actions/customers';
import * as products from '../actions/products';
import * as orders from '../actions/orders';
import * as roles from '../actions/roles';
import * as categories from '../actions/categories';
import * as orderItems from '../actions/orderItems';
import * as shippingAddress from '../actions/shippingAddress';
import {setMessage} from '../actions/message';

export const AllCall = (route) => async dispatch => {
  const url = `${URL_BASIC + route}`;
  try {
    if(route==='customers'){
      dispatch(customers.customersPending());
    } else if (route==='products') {
      dispatch(products.productsPending());
    } else if (route==='orders'){
      dispatch(orders.ordersPending());
    } else if (route==='role'){
      dispatch(roles.rolesPending());
    } else if (route==='category'){
      dispatch(categories.categoriesPending());
    } else if (route==='orderItems'){
      dispatch(orderItems.orderItemsPending());
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.shippingAddressesPending());
    }                 

    const response = await fetch(url, { mode: 'cors'});
    const data = await response.json();
    if(route==='customers'){
      dispatch(customers.getAllCustomers(data));
    } else if (route==='products') {
      dispatch(products.getAllProducts(data));
    } else if (route==='orders'){
      dispatch(orders.getAllOrders(data));
    } else if (route==='role'){
      dispatch(roles.getAllRoles(data));
    } else if (route==='category'){
      dispatch(categories.getAllCategories(data));
    } else if (route==='orderItems'){
      dispatch(orderItems.getAllOrderItems(data));
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.getAllShippingAddresses(data));
    }          
    return data;
  } catch (error) {
    if(route==='customers'){
      dispatch(customers.customerssError(error));
    } else if (route==='products') {
      dispatch(products.productsError(error));
    } else if (route==='orders'){
      dispatch(orders.ordersError(error));
    } else if (route==='role'){
      dispatch(roles.rolesError(error));
    } else if (route==='category'){
      dispatch(categories.categoriesError(error));
    } else if (route==='orderItems'){
      dispatch(orderItems.orderItemsError(error));
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.ShippingAddressesError(error));
    }   
  }
};

export const SingleCall = (route, id) => async dispatch => {
  const Url = `${URL_BASIC + route}`;
  try {
    if(route==='customers'){
      dispatch(customers.customersPending());
    } else if (route==='products') {
      dispatch(products.productsPending());
    } else if (route==='orders'){
      dispatch(orders.ordersPending());
    } else if (route==='role'){
      dispatch(roles.rolesPending());
    } else if (route==='category'){
      dispatch(categories.categoriesPending());
    } else if (route==='orderItems'){
      dispatch(orderItems.orderItemsPending());
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.shippingAddressesPending());
    }      

    const response = await fetch(`${Url}/${id}`, { mode: 'cors' });
    const data = await response.json();
    if(route==='customers'){
      dispatch(customers.getSingleCustomer(data));
    } else if (route==='products') {
      dispatch(products.getSingleProduct(data));
    } else if (route==='orders'){
      dispatch(orders.getSingleOrder(data));
    } else if (route==='role'){
      dispatch(roles.getSingleRole(data));
    } else if (route==='category'){
      dispatch(categories.getSingleCategory(data));
    } else if (route==='orderItems'){
      dispatch(orderItems.getSingleOrderItem(data));
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.getSingleShippingAddress(data));
    }          
    return data;
  } catch (error) {
    if(route==='customers'){
      dispatch(customers.customerssError(error));
    } else if (route==='products') {
      dispatch(products.productsError(error));
    } else if (route==='orders'){
      dispatch(orders.ordersError(error));
    } else if (route==='role'){
      dispatch(roles.rolesError(error));
    } else if (route==='category'){
      dispatch(categories.categoriesError(error));
    } else if (route==='orderItems'){
      dispatch(orderItems.orderItemsError(error));
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.ShippingAddressesError(error));
    }   
  }
};
