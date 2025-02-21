/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("tags").del();

    await knex("tags").insert([
        { tag_id: 1, user_id: 1, tag_name: "guard" },
        { tag_id: 2, user_id: 1, tag_name: "takedown" },
        { tag_id: 3, user_id: 1, tag_name: "submission" },
        { tag_id: 4, user_id: 1, tag_name: "sweep" },
        { tag_id: 5, user_id: 1, tag_name: "defense" }
    ]);
}
