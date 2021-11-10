module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    catid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Category;
};
