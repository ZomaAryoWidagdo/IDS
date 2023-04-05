"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const { status } = require("../data/viewData.json");

    status.forEach((x) => {
      x.createdAt = x.updatedAt = new Date();
      x.status = x.id;

      delete x.id;
    });

    await queryInterface.bulkInsert("Statuses", status);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Statuses", null, {});
  },
};
