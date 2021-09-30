const Role = require('../models/role');
const Customer = require('../models/customer');

exports.initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "Basic"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Basic' to roles collection");
      });

      new Role({
        name: "Admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Admin' to roles collection");
      });      
    }     
  });
  Role.findOne({ name: 'Admin'}, function (err, role){
    if(!err && role) {
      Customer.findOne({role: role._id}, function(err, customer){
        if(!customer){
          new Customer({
            username: 'admin',
            password: 'password',
            email: 'admin@example.com',
            role: role._id
          }).save(err=>{
            if(err){
              console.log(err)
            }
            console.log('admin created');
          })
        }
      })
    }
  });
}