export async function seed(knex) {
    await knex("paths").del();

    await knex("paths").insert([
        // Entry/Exit paths
        { user_id: 1, from_note: 1, to_note: 2, path_type: "entry_exit" },
        { user_id: 1, from_note: 2, to_note: 3, path_type: "entry_exit" },

        // Counter paths
        { user_id: 1, from_note: 4, to_note: 2, path_type: "counter" },
        { user_id: 1, from_note: 5, to_note: 1, path_type: "counter" }
    ]);
}
