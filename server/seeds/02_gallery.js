const galleries = require("../data/galleries.json");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("galleries").del();
  await knex("galleries").insert(galleries);
};
