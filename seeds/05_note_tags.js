/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("note_tags").del();

    await knex("note_tags").insert([
        { note_id: 1, tag_id: 1 },
        { note_id: 1, tag_id: 4 },
        { note_id: 2, tag_id: 2 },
        { note_id: 2, tag_id: 3 },
        { note_id: 3, tag_id: 6 },
        { note_id: 3, tag_id: 3 },
        { note_id: 4, tag_id: 5 },
        { note_id: 4, tag_id: 6 },
        { note_id: 5, tag_id: 1 },
    ]);
}
