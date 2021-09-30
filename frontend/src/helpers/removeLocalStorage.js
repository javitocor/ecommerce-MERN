function removeLocalStorage (customer) {
  let result = null;
  if (localStorage.getItem('customers')) {
    const allCustomers = JSON.parse(localStorage.getItem('customers'));
    result = allCustomers.filter(obj => {
      return obj.customer.username !== customer.username && obj.customer.password !== customer.password
    })
  }
  localStorage.setItem('customers', JSON.stringify(result));
}

export default removeLocalStorage;