/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("tags").del();

    await knex("tags").insert([
        { tag_id: 1, user_id: 1, tag_name: "Takedown" },
        { tag_id: 2, user_id: 1, tag_name: "Submission" },
        { tag_id: 3, user_id: 1, tag_name: "Guard" },
        { tag_id: 4, user_id: 1, tag_name: "No-Gi" },
        { tag_id: 5, user_id: 1, tag_name: "Defense" },
        { tag_id: 6, user_id: 1, tag_name: "Control" },
    ]);
}
