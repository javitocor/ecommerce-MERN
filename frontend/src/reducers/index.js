import { combineReducers } from 'redux';
import authReducer from './auth';
import messageReducer from './message';
import customerReducer from './customers';
import productReducer from './products';
import roleReducer from './roles';
import categoryReducer from './categories';
import orderReducer from './orders';
import orderItemReducer from './orderItems';
import shippingAddressReducer from './shippingAddress';
import cookieReducer from './cookies';


const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  customers: customerReducer,
  products: productReducer,
  roles: roleReducer,
  categories: categoryReducer,
  orders: orderReducer,
  orderItems: orderItemReducer,
  shippingAddress: shippingAddressReducer,
  cookies: cookieReducer,
});

export default rootReducer;