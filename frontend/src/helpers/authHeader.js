export default function authHeader() {
  const customer = JSON.parse(localStorage.getItem('customer'));

  if (customer && customer.accessToken) {
    return { 'x-access-token': customer.accessToken };
  } 
    return {};  
}