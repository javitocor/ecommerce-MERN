const Role = require('../models/role');

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
}