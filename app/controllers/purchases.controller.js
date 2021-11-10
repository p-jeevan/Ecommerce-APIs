const db = require("../models");
const Purchases = db.purchases;
const Op = db.Sequelize.Op;
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// Create and Save a new Purchases
exports.create = (req, res) => {
    // Validate request
    if (!req.body.proid) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Purchases
    const purchases = {
        proid: req.body.proid,
        // userid:req.body.userid,
        quantity: req.body.quantity
        // description: req.body.description,
        // published: req.body.published ? req.body.published : false
    };

    // Save Purchases in the database
    Purchases.create(purchases)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Purchases."

            });
        });
};

// Retrieve all Purchases from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Purchases.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Purchases."
            });
        });
};

// Find a single Purchases with an id
exports.findOne = (req, res) => {
    const purid = req.params.id;

    Purchases.findByPk(purid)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Purchases with purid=${purid}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Purchases with purid=" + purid
            });
        });
};


// Update a Purchases by the id in the request
exports.update = (req, res) => {
    const purid = req.params.id;

    Purchases.update(req.body, {
        where: { purid: purid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Purchases was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Purchases with purid=${purid}. Maybe Purchases was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Purchases with purid=" + purid
            });
        });
};

// Delete a Purchases with the specified id in the request
exports.delete = (req, res) => {
    const purid = req.params.id;

    Purchases.destroy({
        where: { purid: purid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Purchases was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Purchases with purid=${purid}. Maybe Purchases was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Purchases with purid=" + purid
            });
        });
};

// Delete all Purchases from the database.
exports.deleteAll = (req, res) => {
    Purchases.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Purchases were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Purchases."
            });
        });
};

// find all published Purchases
exports.findAllPublished = (req, res) => {
    Purchases.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Purchases."
            });
        });
};
