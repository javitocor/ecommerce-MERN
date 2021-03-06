/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */

import getProducts from './getProducts';


async function cartData(cart) {
  let items = [];
	let order = {'get_cart_total':0, 'get_cart_items':0};
	let cartItems = order.get_cart_items;
  
  for (const productId in cart) {    
    const product = await getProducts(productId);
    cartItems += parseInt(cart[productId].quantity);
    const total = (product.price * parseInt(cart[productId].quantity));
    order.get_cart_total += total;
		order.get_cart_items += parseInt(cart[productId].quantity);
    const item = {
      '_id':product._id,
      'product':{
        'name':product.name, 
        'price':product.price, 
        'image':product.image
        }, 
      'quantity':parseInt(cart[productId].quantity),
      'get_total':total,
    }
    items.push(item);
  };
  return {'cartItems':cartItems ,'order':order, 'items':items}
};

export default cartData;

