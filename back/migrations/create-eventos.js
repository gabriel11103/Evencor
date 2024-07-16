module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("eventos", {
      idEvento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fechaEvento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      establecimiento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("eventos");
  },
};
