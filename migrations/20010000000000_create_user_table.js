export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary();
    table.string('username').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('users');
}