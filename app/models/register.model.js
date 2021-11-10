const bcrypt = require("bcrypt");
const { register } = require(".");
module.exports = (sequelize, Sequelize) => {
    const Register = sequelize.define("register", {
        userid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING
        },

    },
        {
            hooks: {
                beforeCreate: (register, options) => {
                    {
                        register.password = register.password && register.password != "" ? bcrypt.hashSync(register.password, 10) : "";
                    }
                }
            }
        });

    Register.sync()

    return Register;
};
