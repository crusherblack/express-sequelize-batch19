"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER, //integer
      },
      title: {
        type: Sequelize.STRING, //varchar default length 255
      },
      description: {
        type: Sequelize.STRING, //varchar default length 255
      },
      content: {
        type: Sequelize.STRING, //varchar default length 255
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE, // datetime
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE, // datetime
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE, // datetime
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
  },
};
