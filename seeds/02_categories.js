/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("note_categories").del();

    await knex("note_categories").insert([
        { category_id: 1, name: "Takedowns" },
        { category_id: 2, name: "Defenses" },
        { category_id: 3, name: "Positional control" },
        { category_id: 4, name: "Submissions" },
        { category_id: 5, name: "Others" }
    ]);
}
