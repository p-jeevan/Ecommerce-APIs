module.exports = (sequelize, Sequelize) => {
    const Purchases = sequelize.define("purchases", {
      purid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      proid:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
    //   userid:{
    //     type:Sequelize.INTEGER,
    //     allowNull:false
    // },
      quantity:{
          type:Sequelize.INTEGER,
          allowNull:false
      }
    });
  
    return Purchases;
  };
  