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

    const { data } = require("../data/viewData.json");

    data.forEach((x) => {
      x.createdAt = x.updatedAt = x.createOn;

      delete x.id;
      delete x.createOn;
    });

    await queryInterface.bulkInsert("Data", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Data", null, {});
  },
};
