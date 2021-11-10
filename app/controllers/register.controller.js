const { register } = require("../models");
const db = require("../models");
const Register = db.register;
const Op = db.Sequelize.Op;
const Sessions = db.session;

// Create and Save a new Register
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a Register
    const register = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        // userid:req.body.userid,
        // description: req.body.description,
        // published: req.body.published ? req.body.published : false
    };

    // Save Register in the database
    Register.create(register)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Register."

            });
        });
};

// Retrieve all Register from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Register.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Register."
            });
        });
};

// Find a single Register with an id
exports.findOne = (req, res) => {
    const userid = req.params.id;

    Register.findByPk(userid)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Register with userid=${userid}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Register with userid=" + userid
            });
        });
};


// Update a Register by the id in the request
exports.update = (req, res) => {
    const userid = req.params.id;

    Register.update(req.body, {
        where: { userid: userid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Register was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Register with userid=${userid}. Maybe Register was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Register with userid=" + userid
            });
        });
};

// Delete a Register with the specified id in the request
exports.delete = (req, res) => {
    const userid = req.params.id;

    Register.destroy({
        where: { userid: userid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Register was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Register with userid=${userid}. Maybe Register was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Register with userid=" + userid
            });
        });
};

// Delete all Register from the database.
exports.deleteAll = (req, res) => {
    Register.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Register were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Register."
            });
        });
};
//find by email
exports.getUserByEmail = email => User.findOne({
    where: { email },
  });

// find all published Register
exports.findAllPublished = (req, res) => {
    Register.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Register."
            });
        });
};
