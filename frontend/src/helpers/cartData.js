/* eslint-disable no-restricted-syntax */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */

import getProducts from './getProducts';

const a = {
  'productId': {'quantity': 3},
  'productId2': {'quantity': 3},
  'productId3': {'quantity': 3},
}

async function cartData(cart) {
  const items = [];
	const order = {'get_cart_total':0, 'get_cart_items':0};
	const cartItems = order.get_cart_items;

  for (const productId in cart) {
    const product = await getProducts(productId);
    cartItems += cart[productId].quantity;
    total = (product.price * cart[productId].quantity);
    order.get_cart_total += total
		order.get_cart_items += cart[i].quantity
    const item = {
      'id':product._id,
      'product':{
        'name':product.name, 
        'price':product.price, 
        'image':product.image
        }, 
      'quantity':cart[productId].quantity,
      'get_total':total,
    }
    items.push(item);
  };
  return {'cartItems':cartItems ,'order':order, 'items':items}
};

export default cartData;

