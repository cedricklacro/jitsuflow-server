export function up(knex) {
    return knex.schema.createTable('note_tags', (table) => {
        table.integer('note_id').unsigned().notNullable().references('note_id').inTable('notes').onDelete('CASCADE');
        table.integer('tag_id').unsigned().notNullable().references('tag_id').inTable('tags').onDelete('CASCADE');
    });
}

export function down(knex) {
    return knex.schema.dropTable('note_tags');
}