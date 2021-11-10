const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Products
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Products
  const products = {
    catid:req.body.catid,
    name: req.body.name,
    quantity:req.body.quantity
    // description: req.body.description,
    // published: req.body.published ? req.body.published : false
  };

  // Save Products in the database
  Products.create(products)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Products."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Products.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

// Find a single Products with an id
exports.findOne = (req, res) => {
  const proid = req.params.id;

  Products.findByPk(proid)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Products with proid=${proid}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Products with proid=" + proid
      });
    });
};


// Update a Products by the id in the request
exports.update = (req, res) => {
  const proid = req.params.id;

  Products.update(req.body,{
    where: { proid: proid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Products was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Products with proid=${proid}. Maybe Products was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Products with proid=" + proid
      });
    });
};

// Delete a Products with the specified id in the request
exports.delete = (req, res) => {
  const proid = req.params.id;

  Products.destroy({
    where: { proid: proid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Products was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Products with proid=${proid}. Maybe Products was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Products with proid=" + proid
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
    Products.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    });
};

// find all published Products
exports.findAllPublished = (req, res) => {
    Products.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};
