/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("comments").del();

    await knex("comments").insert([
        { comment_id: 1, user_id: 1, note_id: 1, comment: "Great takedown for no-gi!", category: "success", created_at: knex.fn.now() },
        { comment_id: 2, user_id: 1, note_id: 1, comment: "Need to change levels faster before shooting in.", category: "adjustment", created_at: knex.fn.now() },
        { comment_id: 3, user_id: 1, note_id: 1, comment: "Struggled when opponent sprawled hard.", category: "struggles", created_at: knex.fn.now() },

        { comment_id: 4, user_id: 1, note_id: 2, comment: "Triangle works better when I control the wrist first.", category: "adjustment", created_at: knex.fn.now() },
        { comment_id: 5, user_id: 1, note_id: 2, comment: "Had success locking this in during live rolling!", category: "success", created_at: knex.fn.now() },
        { comment_id: 6, user_id: 1, note_id: 2, comment: "I struggle setting this up when my opponent postures up.", category: "struggles", created_at: knex.fn.now() },

        { comment_id: 7, user_id: 1, note_id: 3, comment: "Need to focus more on hip movement.", category: "adjustment", created_at: knex.fn.now() },
        { comment_id: 8, user_id: 1, note_id: 3, comment: "Using frames correctly helped me a lot.", category: "success", created_at: knex.fn.now() },
        { comment_id: 9, user_id: 1, note_id: 3, comment: "Opponent’s knee cut pass is giving me trouble.", category: "struggles", created_at: knex.fn.now() },

        { comment_id: 10, user_id: 1, note_id: 4, comment: "Posture up is my go-to defense against triangles.", category: "success", created_at: knex.fn.now() },
        { comment_id: 11, user_id: 1, note_id: 4, comment: "Keeping my back straight makes a huge difference.", category: "adjustment", created_at: knex.fn.now() },
        { comment_id: 12, user_id: 1, note_id: 4, comment: "Still getting broken down by higher belts.", category: "struggles", created_at: knex.fn.now() },

        { comment_id: 13, user_id: 1, note_id: 5, comment: "Osoto Gari works well but I need better timing.", category: "adjustment", created_at: knex.fn.now() },
        { comment_id: 14, user_id: 1, note_id: 5, comment: "Landed this multiple times in sparring!", category: "success", created_at: knex.fn.now() },
        { comment_id: 15, user_id: 1, note_id: 5, comment: "Struggled when opponent pivoted early.", category: "struggles", created_at: knex.fn.now() }
    ]);
}
