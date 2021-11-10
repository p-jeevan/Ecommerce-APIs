module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
      proid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      catid:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      name: {
        type: Sequelize.STRING
      },
      quantity:{
          type:Sequelize.INTEGER,
          allowNull:false
      }
    });
  
    return Products;
  };
  
  