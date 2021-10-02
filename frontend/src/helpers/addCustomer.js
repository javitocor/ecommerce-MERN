const addCustomer = (customer) =>{
  localStorage.setItem("customer", JSON.stringify(customer));

};

export default addCustomer;