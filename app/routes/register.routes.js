module.exports = app => {
  const register = require("../controllers/register.controller.js");

  var router = require("express").Router();

  // Create a new register
  router.post("/", register.create);

  // Retrieve all register
  router.get("/", register.findAll);

  // Retrieve all published register
  router.get("/published", register.findAllPublished);

  // Retrieve a single register with id
  router.get("/:id", register.findOne);

  // Update a register with id
  router.put("/:id", register.update);

  // Delete a register with id
  router.delete("/:id", register.delete);

  // Delete all register
  router.delete("/", register.deleteAll);

  app.use('/api/register', router);
};


