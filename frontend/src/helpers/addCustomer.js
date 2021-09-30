function objectAdder(customer) {
  const allCustomers = JSON.parse(localStorage.getItem('customers'));
  allCustomers.push(customer);
  return allCustomers;
}


const addCustomer = (customer) =>{
  if (localStorage.getItem('customers')) {
    localStorage.setItem('customers', JSON.stringify(objectAdder(customer)));
  } else {
    const add = [];
    add.push(customer)
    localStorage.setItem('customers', JSON.stringify(add));
  }
}



export default addCustomer;