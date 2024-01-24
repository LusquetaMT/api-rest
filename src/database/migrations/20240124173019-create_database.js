/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createDatabase('database_name');
  },

  down: async (queryInterface) => {
    await queryInterface.dropAllSchemas();
  },
};
