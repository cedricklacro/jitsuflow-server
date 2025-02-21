/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("note_categories").del();

    await knex("note_categories").insert([
        { category_id: 1, name: "others" },
        { category_id: 2, name: "takedowns" },
        { category_id: 3, name: "defenses" },
        { category_id: 4, name: "positional control" },
        { category_id: 5, name: "submissions" }
    ]);
}
