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
    await queryInterface.bulkInsert("users", [
      {
        username: "admin",
        email: "admin@gmail.com",
        phone: 1234567890,
        password:
          "$2b$05$kOVP3h6arwWmiyg2DFdmQ.TvoCWOpr4dPZBCzVFyzrwzJyeZLd7HS",
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "masteradmin",
        email: "masteradmin@gmail.com",
        phone: 2345678901,
        password:
          "$2b$05$kOVP3h6arwWmiyg2DFdmQ.TvoCWOpr4dPZBCzVFyzrwzJyeZLd7HS",
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
