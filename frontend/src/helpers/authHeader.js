export default function authHeader() {
  const customer = JSON.parse(localStorage.getItem('customers'));

  if (customer && customer.accessToken) {
    return { 'x-access-token': customer.accessToken };
  } 
    return {};  
}