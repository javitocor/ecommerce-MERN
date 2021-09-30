export default function authHeader(customer) {
  const AllCustomers = JSON.parse(localStorage.getItem('customers'));
  const singlecustomer = AllCustomers.filter(obj => {
    return obj.customer.username === customer.username && obj.customer.password === customer.password
  });

  if (singlecustomer && singlecustomer.accessToken) {
    return { 'x-access-token': singlecustomer.accessToken };
  } 
    return {};  
}