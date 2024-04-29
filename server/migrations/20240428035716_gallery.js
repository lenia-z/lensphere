/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("gallery", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("users.id");
    table.string("description").notNullable();
    table.string("image").notNullable();
    table.integer("likes").defaultTo(0).notNullable();
    table.timestamp("create_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("gallery");
};
