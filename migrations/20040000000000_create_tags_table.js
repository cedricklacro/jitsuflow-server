export function up(knex) {
    return knex.schema.createTable('tags', (table) => {
        table.increments('tag_id').primary();
        table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE');
        table.string('tag_name').notNullable();
    });
}

export function down(knex) {
    return knex.schema.dropTable('tags');
}