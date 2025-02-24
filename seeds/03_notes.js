/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("notes").del();

    await knex("notes").insert([
        {
            note_id: 1,
            user_id: 1,
            category_id: 1,
            title: "Double Leg Takedown",
            content: `
                <p><strong>Double Leg Takedown</strong> is a powerful way to bring your opponent to the mat.</p>
                <ul>
                    <li><strong>Step 1:</strong> <em>Lower your level</em> and shoot in.</li>
                    <li><strong>Step 2:</strong> Secure both legs and drive forward.</li>
                    <li><strong>Step 3:</strong> <u>Finish with control</u> to prevent counterattacks.</li>
                </ul>
                <p>Watch this <a href="https://www.youtube.com/watch?v=example">tutorial</a> for technique details.</p>
                <p><img src="http://localhost:8080/images/double_leg.jpg" alt="Double Leg Takedown Execution"></p>
            `,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
        {
            note_id: 2,
            user_id: 1,
            category_id: 4,
            title: "Triangle Choke",
            content: `
                <p>The <strong>Triangle Choke</strong> is a powerful submission from guard.</p>
                <ol>
                    <li>Break their posture.</li>
                    <li>Control their wrist and swing your leg over.</li>
                    <li>Lock the <u>triangle position</u> and squeeze.</li>
                </ol>
                <p>Here’s a <a href="https://bjjfanatics.com/triangle">link</a> to a great instructional video.</p>
                <p><img src="http://localhost:8080/images/triangle_choke.jpg" alt="Triangle Choke Setup"></p>
            `,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
        {
            note_id: 3,
            user_id: 1,
            category_id: 3,
            title: "Guard Retention",
            content: `
                <p>Maintaining <strong>guard retention</strong> is key in BJJ.</p>
                <ul>
                    <li>Use <u>hip movement</u> to reset guard.</li>
                    <li>Frame against their shoulders.</li>
                    <li><strong>Leg pummeling</strong> prevents easy passes.</li>
                </ul>
                <p>Check out this <a href="https://bjjguard.com">resource</a> for advanced guard retention techniques.</p>
            `,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
        {
            note_id: 4,
            user_id: 1,
            category_id: 2,
            title: "Posture Up",
            content: `
                <p>To <strong>posture up</strong> in closed guard:</p>
                <ol>
                    <li><em>Keep your spine straight</em> to prevent breaking posture.</li>
                    <li>Control their hips before moving.</li>
                    <li><u>Look up</u> to keep your posture strong.</li>
                </ol>
                <p>Watch <a href="https://bjjposture.com">this video</a> to see good posture techniques.</p>
            `,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
        {
            note_id: 5,
            user_id: 1,
            category_id: 1,
            title: "Osoto Gari",
            content: `
                <p><strong>Osoto Gari</strong> is a powerful judo throw.</p>
                <ul>
                    <li>Step to the outside of their foot.</li>
                    <li>Reap their leg while pulling them forward.</li>
                    <li><u>Maintain control</u> on landing.</li>
                </ul>
                <p><img src="http://localhost:8080/images/osotogari.jpg" alt="Osoto Gari execution"></p>
            `,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
    ]);
}