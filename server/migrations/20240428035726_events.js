/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("events", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().references("users.id");
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("country").notNullable();
    table.string("province").notNullable();
    table.string("city").notNullable();
    table.string("address").notNullable();
    table.integer("likes").defaultTo(0);
    table.timestamp("date").notNullable();
    table.timestamp("create_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("events");
};
