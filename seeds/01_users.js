/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("users").del();

    await knex("users").insert([
        { user_id: 1, username: "Cedrick21" },
        { user_id: 2, username: "jiujitsu_fan" },
        { user_id: 3, username: "bjj_master" }
    ]);
}
