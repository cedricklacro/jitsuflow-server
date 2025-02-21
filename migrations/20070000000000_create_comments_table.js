export function up(knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments('comment_id').primary();
        table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE');
        table.integer('note_id').unsigned().notNullable().references('note_id').inTable('notes').onDelete('CASCADE');
        table.text('comment').notNullable();
        table.enu('category', ['success', 'struggles', 'adjustment']).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export function down(knex) {
    return knex.schema.dropTable('comments');
}
