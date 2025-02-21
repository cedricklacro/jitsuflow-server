/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("paths").del();

    await knex("paths").insert([
        { path_id: 1, user_id: 1, from_note: 1, to_note: 2, path_type: "entry" },
        { path_id: 2, user_id: 1, from_note: 2, to_note: 3, path_type: "exit" },
        { path_id: 3, user_id: 1, from_note: 3, to_note: 1, path_type: "counter" }
    ]);
}
