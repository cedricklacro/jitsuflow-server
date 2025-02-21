import knexInit from "knex";
import configuration from "../knexfile.js";
const knex = knexInit(configuration);

const getCategories = async (req, res) => {
    try {
        const categories = await knex("note_categories").select("*");
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

export { getCategories }
