export function up(knex) {
  return knex.schema.createTable('note_categories', (table) => {
    table.increments('category_id').primary();
    table.string('name').notNullable().unique();
  });
}

export function down(knex) {
  return knex.schema.dropTable('note_categories');
}