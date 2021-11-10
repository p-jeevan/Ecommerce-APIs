module.exports = app => {
    const purchases = require("../controllers/purchases.controller.js");
  
    var router = require("express").Router();
  
    // Create a new purchases
    router.post("/", purchases.create);
  
    // Retrieve all purchases
    router.get("/", purchases.findAll);
  
    // Retrieve all published purchases
    router.get("/published", purchases.findAllPublished);
  
    // Retrieve a single purchases with id
    router.get("/:id", purchases.findOne);
  
    // Update a purchases with id
    router.put("/:id", purchases.update);
  
    // Delete a purchases with id
    router.delete("/:id", purchases.delete);
  
    // Delete all purchases
    router.delete("/", purchases.deleteAll);
  
    app.use('/api/purchases', router);
  };
  