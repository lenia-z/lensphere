const gallery = require("../data/gallery.json");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("gallery").del();
  await knex("gallery").insert(gallery);
};
