/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("comments").del();

    // Inserts seed entries
    await knex("comments").insert([
        { comment_id: 1, user_id: 1, note_id: 1, comment: "This takedown works great for no-gi!", category: "success" },
        { comment_id: 2, user_id: 1, note_id: 2, comment: "I struggle setting up the triangle when my opponent postures up.", category: "struggles" },
        { comment_id: 3, user_id: 1, note_id: 3, comment: "I need to focus on hip movement to improve my guard retention.", category: "adjustment" }
    ]);
}
