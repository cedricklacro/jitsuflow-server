export function up(knex) {
    return knex.schema.createTable('paths', (table) => {
        table.increments('path_id').primary();
        table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE');
        table.integer('from_note').unsigned().references('note_id').inTable('notes').onDelete('CASCADE');
        table.integer('to_note').unsigned().references('note_id').inTable('notes').onDelete('CASCADE');
        table.enu('path_type', ['entry_exit', 'counter']).notNullable();
    });
}

export function down(knex) {
    return knex.schema.dropTable('paths');
}
