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
import authHeader from "./authHeader";

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

    const response = await fetch(url, { mode: 'cors',   headers: authHeader() });
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
    dispatch(setMessage(error));
    if(route==='customers'){
      dispatch(customers.customersError(error));
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
      dispatch(shippingAddress.shippingAddressesError(error));
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

    const response = await fetch(`${Url}/${id}`, { mode: 'cors',   headers: authHeader() });
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
    dispatch(setMessage(error));
    if(route==='customers'){
      dispatch(customers.customersError(error));
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
      dispatch(shippingAddress.shippingAddressesError(error));
    }   
  }
};

export const DeleteCall = (route, token, id) => async dispatch => {
  const url = `${URL_BASIC + route}`
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
    const tokenHeader = authHeader()
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token,
        'x-access-token': tokenHeader['x-access-token']
      },
    });
    const newData = await response.json();
    if(route==='customers'){
      dispatch(customers.deleteCustomer(id));
    } else if (route==='products') {
      dispatch(products.deleteProduct(id));
    } else if (route==='orders'){
      dispatch(orders.deleteOrder(id));
    } else if (route==='role'){
      dispatch(roles.deleteRole(id));
    } else if (route==='category'){
      dispatch(categories.deleteCategory(id));
    } else if (route==='orderItems'){
      dispatch(orderItems.deleteOrderItem(id));
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.deleteShippingAddress(id));
    }  
    dispatch(setMessage(newData.message));     
    return newData;
  } catch (error) {
    dispatch(setMessage(error));
    if(route==='customers'){
      dispatch(customers.customersError(error));
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
      dispatch(shippingAddress.shippingAddressesError(error));
    }   
  }
};

export const CreateCall = (route, token, data) => async dispatch => {
  const url = `${URL_BASIC + route}`
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
    const tokenHeader = authHeader()
    let deliverData = null;   
    let headers = null;  
    if(route !=='products') {
      deliverData = JSON.stringify(data);
      headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token,
        'x-access-token': tokenHeader['x-access-token']
      }; 
    } else {
      deliverData = data
      headers = {
        'X-CSRF-Token': token,
        'x-access-token': tokenHeader['x-access-token']
      };
    }
    const response = await fetch(`${url}/create`, {
      method: 'POST',
      headers,
      body: deliverData,
    });
    const newData = await response.json();
    if(route==='customers'){
      dispatch(customers.createCustomer(newData.customer));
    } else if (route==='products') {
      dispatch(products.createProduct(newData.product));
    } else if (route==='orders'){
      dispatch(orders.createOrder(newData.order));
    } else if (route==='role'){
      dispatch(roles.createRole(newData.role));
    } else if (route==='category'){
      dispatch(categories.createCategory(newData.category));
    } else if (route==='orderItems'){
      dispatch(orderItems.createOrderItem(newData.OrderItem));
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.createShippingAddress(newData.shippingAddress));
    } 
    dispatch(setMessage(newData.message));        
    return newData;
  } catch (error) {
    dispatch(setMessage(error));
    if(route==='customers'){
      dispatch(customers.customersError(error));
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
      dispatch(shippingAddress.shippingAddressesError(error));
    }   
  }
};

export const UpdateCall = (route, token, data, id) => async dispatch => {
  const url = `${URL_BASIC + route}`
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
    const tokenHeader = authHeader()
    let deliverData = null;   
    let headers = null;  
    if(route !=='products') {
      deliverData = JSON.stringify(data);
      headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': token,
        'x-access-token': tokenHeader['x-access-token']
      }; 
    } else {
      deliverData = data
      headers = {
        'X-CSRF-Token': token,
        'x-access-token': tokenHeader['x-access-token']
      };
    }
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers,
      body: deliverData,
    });
    const newData = await response.json();
    if(route==='customers'){
      dispatch(customers.updateCustomer(newData.customer, id));
    } else if (route==='products') {
      dispatch(products.updateProduct(newData.product, id));
    } else if (route==='orders'){
      dispatch(orders.updateOrder(newData.order, id));
    } else if (route==='role'){
      dispatch(roles.updateRole(newData.role, id));
    } else if (route==='category'){
      dispatch(categories.updateCategory(newData.category, id));
    } else if (route==='orderItems'){
      dispatch(orderItems.updateOrderItem(newData.OrderItem, id));
    } else if (route==='shippingAddress'){
      dispatch(shippingAddress.updateShippingAddress(newData.shippingAddress, id));
    } 
    dispatch(setMessage(newData.message));     
    return newData;
  } catch (error) {
    dispatch(setMessage(error));
    console.log(error)
    if(route==='customers'){
      dispatch(customers.customersError(error));
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
      dispatch(shippingAddress.shippingAddressesError(error));
    }   
  }
};

