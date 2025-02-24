/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("notes").del();

    await knex("notes").insert([
        { note_id: 1, user_id: 1, category_id: 2, title: "Double Leg Takedown", content: "A fundamental wrestling takedown used in BJJ." },
        { note_id: 2, user_id: 1, category_id: 4, title: "Triangle Choke", content: "A submission technique executed from guard position." },
        { note_id: 3, user_id: 1, category_id: 3, title: "Guard Retention", content: "Techniques to maintain and recover guard position." },
        { note_id: 4, user_id: 1, category_id: 4, title: "Posture Up", content: "A counter move against the Triangle Choke." },
        { note_id: 5, user_id: 1, category_id: 2, title: "Sprawl", content: "A counter move against the Double Leg Takedown." }
    ]);
}


