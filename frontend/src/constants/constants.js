export const URL_BASIC = '/api/';

const customer = JSON.parse(localStorage.getItem("customer"));

export const initialStateAuth =  customer 
? { loggedIn: true, customer }
: { loggedIn: false, customer: {} }

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const initialStateCustomers = {
  error: null,
  pending: false,
  customersList: [],
  customer: {},
};

export const GET_ALL_CUSTOMERS = 'GET_ALL_CUSTOMERS';
export const GET_SINGLE_CUSTOMER = 'GET_CUSTOMER';
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const CUSTOMERS_ERROR = 'CUSTOMERS_ERROR';
export const CUSTOMERS_PENDING = 'CUSTOMERS_PENDING';

export const initialStateProducts = {
  error: null,
  pending: false,
  productsList: [],
  product: {},
};

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_SINGLE_PRODUCT = 'GET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const PRODUCTS_ERROR = 'PRODUCTS_ERROR';
export const PRODUCTS_PENDING = 'PRODUCTS_PENDING';

export const initialStateOrders = {
  error: null,
  pending: false,
  ordersList: [],
  order: {},
};

export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const GET_SINGLE_ORDER = 'GET_ORDER';
export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';
export const ORDERS_ERROR = 'ORDERS_ERROR';
export const ORDERS_PENDING = 'ORDERS_PENDING';

export const initialStateRoles = {
  error: null,
  pending: false,
  rolesList: [],
  role: {},
};

export const GET_ALL_ROLES = 'GET_ALL_ROLES';
export const GET_SINGLE_ROLE = 'GET_ROLE';
export const CREATE_ROLE = 'CREATE_ROLE';
export const UPDATE_ROLE = 'UPDATE_ROLE';
export const DELETE_ROLE = 'DELETE_ROLE';
export const ROLES_ERROR = 'ROLES_ERROR';
export const ROLES_PENDING = 'ROLES_PENDING';

export const initialStateCategories = {
  error: null,
  pending: false,
  categoriesList: [],
  catefory: {},
};

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_SINGLE_CATEGORY = 'GET_CATEGORY';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';
export const CATEGORIES_PENDING = 'CATEGORIES_PENDING';

export const initialStateShippingAddresses = {
  error: null,
  pending: false,
  shippingList: [],
  shippingAddress: {},
};

export const GET_ALL_SHIPPING_ADDRESSES = 'GET_ALL_SHIPPING_ADDRESSES';
export const GET_SINGLE_SHIPPING_ADDRESS = 'GET_SHIPPING_ADDRESS';
export const CREATE_SHIPPING_ADDRESS = 'CREATE_SHIPPING_ADDRESS';
export const UPDATE_SHIPPING_ADDRESS = 'UPDATE_SHIPPING_ADDRESS';
export const DELETE_SHIPPING_ADDRESS = 'DELETE_SHIPPING_ADDRESS';
export const SHIPPING_ADDRESSES_ERROR = 'SHIPPING_ADDRESSES_ERROR';
export const SHIPPING_ADDRESSES_PENDING = 'SHIPPING_ADDRESSES_PENDING';

export const initialStateOrderItems = {
  error: null,
  pending: false,
  orderItemsList: [],
  orderItem: {},
};

export const GET_ALL_ORDERITEMS = 'GET_ALL_ORDERITEMS';
export const GET_SINGLE_ORDERITEM= 'GET_ORDERITEM';
export const CREATE_ORDERITEM= 'CREATE_ORDERITEM';
export const UPDATE_ORDERITEM= 'UPDATE_ORDERITEM';
export const DELETE_ORDERITEM= 'DELETE_ORDERITEM';
export const ORDERITEMS_ERROR = 'ORDERITEMS_ERROR';
export const ORDERITEMS_PENDING = 'ORDERITEMS_PENDING';

export const GET_COOKIE = 'GET_COOKIE';
export const UPDATE_COOKIE = 'UPDATE_COOKIE';
export const DELETE_COOKIE = 'DELETE_COOKIE';