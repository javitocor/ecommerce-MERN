const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const Product = require("../models/product");
const mongoose = require("mongoose");
const URLS = ['https://fakestoreapi.com/products'];

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("mongodb connection in development environment successful"))
  .catch(error => console.log(error));

let saveCounter = 0;

async function saveProduct(product) {
  try {
    const stock = Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(3) + 1)) + Math.ceil(3);
    const newproduct = new Product({
      name: product.title,
      description: product.description,
      price: product.price,
      stock,
      image: product.image
    });
  await newproduct.save();
    
  } catch(error){
    console.log(error);
  }
  
}

URLS.map(async url => {
  try {
    const response = await axios.get(url);
    for (let i = 0; i < response.data.length; i++) {
      const product = await saveProduct(response.data[i]);
      console.log(`Product ${i} successfully saved`);
      saveCounter++;
      if (saveCounter === response.data.length) {
        mongoose
          .disconnect()
          .then(() => console.log("mongodb disconnected"))
          .catch(error => console.log(error));
      };
    };
  } catch (error) {
    console.log(error);
  }
});

