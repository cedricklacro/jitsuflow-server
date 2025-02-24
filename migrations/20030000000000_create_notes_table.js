export function up(knex) {
  return knex.schema.createTable('notes', (table) => {
    table.increments('note_id').primary();
    table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE');
    table.integer('category_id').unsigned().nullable().references('category_id').inTable('note_categories').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content', 'longtext');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
}

export function down(knex) {
  return knex.schema.dropTable('notes');
}