import knexInit from "knex";
import configuration from "../knexfile.js";
const knex = knexInit(configuration);

const getCategories = async (req, res) => {
    try {
        const categories = await knex("note_categories").select("*").orderBy("category_id", "asc");;
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

const getNotesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // If categoryId is "all", fetch all notes. Otherwise, filter by category.
        let notesQuery = knex("notes")
            .select("notes.note_id", "notes.title");

        if (categoryId !== "all") {
            notesQuery = notesQuery.where("notes.category_id", categoryId);
        }

        const notes = await notesQuery;

        // Fetch note tags
        const noteTags = await knex("note_tags")
            .join("tags", "note_tags.tag_id", "tags.tag_id")
            .select("note_tags.note_id", "tags.tag_name")
            .whereIn("note_tags.note_id", notes.map(note => note.note_id));

        // Combine notes with their tags
        const notesWithTags = notes.map(note => ({
            note_id: note.note_id,
            title: note.title,
            tags: noteTags
                .filter(tag => tag.note_id === note.note_id)
                .map(tag => tag.tag_name)
        }));

        res.status(200).json(notesWithTags);
    } catch (error) {
        console.error("Error fetching notes by category:", error);
        res.status(500).json({ error: "Failed to fetch notes by category" });
    }
};

const getNoteDetails = async (req, res) => {
    try {
        const { noteId } = req.params;

        // Fetch the main note details along with category info
        const note = await knex("notes")
            .leftJoin("note_categories", "notes.category_id", "note_categories.category_id")
            .where("notes.note_id", noteId)
            .select(
                "notes.note_id",
                "notes.title",
                "notes.content",
                "notes.category_id",
                "note_categories.name as category_name"
            )
            .first();

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Fetch tags for this note
        const tags = await knex("note_tags")
            .join("tags", "note_tags.tag_id", "tags.tag_id")
            .where("note_tags.note_id", noteId)
            .select("tags.tag_name");

        // Fetch paths with path_type distinction
        const paths = await knex("paths")
            .join("notes as from_notes", "paths.from_note", "from_notes.note_id")
            .join("notes as to_notes", "paths.to_note", "to_notes.note_id")
            .where("paths.from_note", noteId)
            .orWhere("paths.to_note", noteId)
            .select(
                "paths.path_type",
                "paths.from_note",
                "from_notes.note_id as from_id",
                "from_notes.title as from_title",
                "paths.to_note",
                "to_notes.note_id as to_id",
                "to_notes.title as to_title"
            );

        // Categorize paths dynamically
        const formattedPaths = {
            entry: [],
            exit: [],
            counter_for: [],
            can_be_countered_by: []
        };

        paths.forEach(path => {
            if (path.path_type === "entry_exit") {
                if (path.to_note === parseInt(noteId)) {
                    // If `to_note` matches, it's an Entry path
                    formattedPaths.entry.push({
                        note_id: path.from_id,
                        title: path.from_title
                    });
                } else {
                    // Otherwise, it's an Exit path
                    formattedPaths.exit.push({
                        note_id: path.to_id,
                        title: path.to_title
                    });
                }
            } else if (path.path_type === "counter") {
                if (path.from_note === parseInt(noteId)) {
                    // If `from_note` matches, this move can be countered by `to_note`
                    formattedPaths.can_be_countered_by.push({
                        note_id: path.to_id,
                        title: path.to_title
                    });
                } else {
                    // Otherwise, this move is a counter for `from_note`
                    formattedPaths.counter_for.push({
                        note_id: path.from_id,
                        title: path.from_title
                    });
                }
            }
        });

        // Construct the response
        const noteDetails = {
            note_id: note.note_id,
            title: note.title,
            content: note.content,
            category_id: note.category_id,
            category_name: note.category_name,
            tags: tags.map(tag => tag.tag_name),
            paths: formattedPaths
        };

        res.status(200).json(noteDetails);
    } catch (error) {
        console.error("Error fetching note details:", error);
        res.status(500).json({ error: "Failed to fetch note details" });
    }
};


const createNote = async (req, res) => {
    try {
        const { user_id, category_id, title, content, tags, entry_paths, exit_paths, counter_for, can_be_countered_by } = req.body;

        // Validate required fields
        if (!user_id || !category_id || !title) {
            return res.status(400).json({ error: "user_id, category_id, and title are required" });
        }

        // Start a transaction for database integrity
        await knex.transaction(async (trx) => {
            // Insert the new note and get its ID
            const [note_id] = await trx("notes").insert({
                user_id,
                category_id,
                title,
                content
            });

            // Helper function to find or create a note by title
            const findOrCreateNote = async (noteTitle) => {
                let note = await trx("notes").where("title", noteTitle).first();

                if (!note) {
                    // Create a new note with just the title
                    const [newNoteId] = await trx("notes").insert({
                        user_id,
                        category_id: null, // No category yet
                        title: noteTitle,
                        content: null
                    });

                    note = { note_id: newNoteId };
                }
                return note.note_id;
            };

            // Insert tags if provided
            if (tags && Array.isArray(tags)) {
                for (const tagName of tags) {
                    let tag = await trx("tags").where({ tag_name: tagName, user_id }).first();

                    // If tag does not exist, create it
                    if (!tag) {
                        const [tag_id] = await trx("tags").insert({ tag_name: tagName, user_id });
                        tag = { tag_id };
                    }

                    // Link the note with the tag
                    await trx("note_tags").insert({ note_id, tag_id: tag.tag_id });
                }
            }

            // Function to insert new paths
            const insertPaths = async (pathsArray, pathType) => {
                for (const pathTitle of pathsArray) {
                    const linkedNoteId = await findOrCreateNote(pathTitle);

                    await trx("paths").insert({
                        user_id,
                        from_note: pathType === "entry_exit" ? linkedNoteId : note_id,
                        to_note: pathType === "entry_exit" ? note_id : linkedNoteId,
                        path_type: pathType
                    });
                }
            };

            // Insert new paths
            if (entry_paths) await insertPaths(entry_paths, "entry_exit");
            if (exit_paths) await insertPaths(exit_paths, "entry_exit");
            if (counter_for) await insertPaths(counter_for, "counter");
            if (can_be_countered_by) await insertPaths(can_be_countered_by, "counter");

            res.status(201).json({ message: "Note created successfully", note_id });
        });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ error: "Failed to create note" });
    }
};

const getCommentsByNote = async (req, res) => {
    try {
        const { noteId } = req.params;

        // Fetch all comments related to the given note_id
        const comments = await knex("comments")
            .join("users", "comments.user_id", "users.user_id")
            .where("comments.note_id", noteId)
            .select(
                "comments.comment_id",
                "comments.user_id",
                "users.username",
                "comments.comment",
                "comments.category",
                "comments.created_at"
            )
            .orderBy("comments.created_at", "desc");

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};

const addCommentToNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { user_id, comment, category } = req.body;

        // Validate required fields
        if (!user_id || !comment || !category) {
            return res.status(400).json({ error: "user_id, comment, and category are required" });
        }

        // Ensure category is valid
        const validCategories = ["success", "struggles", "adjustment"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: "Invalid category. Must be 'success', 'struggles', or 'adjustment'." });
        }

        // Check if note exists
        const noteExists = await knex("notes").where("note_id", noteId).first();
        if (!noteExists) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Insert new comment
        const [comment_id] = await knex("comments").insert({
            user_id,
            note_id: noteId,
            comment,
            category
        });

        res.status(201).json({ message: "Comment added successfully", comment_id });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
};

const editComment = async (req, res) => {
    try {
        const { noteId, commentId } = req.params;
        const { comment, category } = req.body;

        // Validate required fields
        if (!comment || !category) {
            return res.status(400).json({ error: "Comment and category are required" });
        }

        // Ensure category is valid
        const validCategories = ["success", "struggles", "adjustment"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: "Invalid category. Must be 'success', 'struggles', or 'adjustment'." });
        }

        // Check if the comment exists and belongs to the given note
        const existingComment = await knex("comments")
            .where("comment_id", commentId)
            .andWhere("note_id", noteId)
            .first();

        if (!existingComment) {
            return res.status(404).json({ error: "Comment not found or does not belong to this note" });
        }

        // Update the comment
        await knex("comments")
            .where("comment_id", commentId)
            .update({ comment, category });

        res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Failed to update comment" });
    }
};

const updatePathsForNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { user_id, paths } = req.body;

        // Validate required fields
        if (!user_id || !paths || !Array.isArray(paths)) {
            return res.status(400).json({ error: "user_id and a valid paths array are required" });
        }

        // Check if note exists
        const noteExists = await knex("notes").where("note_id", noteId).first();
        if (!noteExists) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Delete existing paths for this note
        await knex("paths")
            .where("from_note", noteId)
            .orWhere("to_note", noteId)
            .del();

        // Insert new paths
        for (const path of paths) {
            if (!["entry", "exit", "counter"].includes(path.path_type)) {
                return res.status(400).json({ error: "Invalid path_type. Must be 'entry', 'exit', or 'counter'." });
            }

            await knex("paths").insert({
                user_id,
                from_note: path.from_note || null, // If provided
                to_note: path.to_note || null, // If provided
                path_type: path.path_type
            });
        }

        res.status(200).json({ message: "Paths updated successfully" });
    } catch (error) {
        console.error("Error updating paths:", error);
        res.status(500).json({ error: "Failed to update paths" });
    }
};

const updateNoteDetails = async (req, res) => {
    try {
        const { noteId } = req.params;
        const { title, content, category_id, tags, entry_paths, exit_paths, counter_for, can_be_countered_by, user_id } = req.body;

        // Validate required fields
        if (!title || !category_id) {
            return res.status(400).json({ error: "Title and category_id are required" });
        }

        // Check if the note exists
        const existingNote = await knex("notes").where("note_id", noteId).first();
        if (!existingNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Update the note in the database
        await knex("notes")
            .where("note_id", noteId)
            .update({
                title,
                content,
                category_id,
                updated_at: knex.fn.now()
            });

        // Handle tags if provided
        if (tags && Array.isArray(tags)) {
            await knex("note_tags").where("note_id", noteId).del();

            for (const tag of tags) {
                let tagRecord = await knex("tags").where({ tag_name: tag, user_id }).first();

                if (!tagRecord) {
                    const newTagId = await knex("tags").insert({ tag_name: tag, user_id });
                    tagRecord = { tag_id: newTagId[0] };
                }

                await knex("note_tags").insert({
                    note_id: noteId,
                    tag_id: tagRecord.tag_id
                });
            }
        }

        // Helper function to find or create a note by title
        const findOrCreateNote = async (title) => {
            let note = await knex("notes").where("title", title).first();

            if (!note) {
                // Create a new note with just the title
                const newNoteId = await knex("notes").insert({
                    user_id,
                    category_id: null, // No category yet
                    title,
                    content: null
                });

                note = { note_id: newNoteId[0] };
            }
            return note.note_id;
        };

        // Remove all existing paths for this note before adding new ones
        await knex("paths").where("from_note", noteId).orWhere("to_note", noteId).del();

        // Function to insert new paths
        const insertPaths = async (pathsArray, pathType) => {
            for (const pathTitle of pathsArray) {
                const linkedNoteId = await findOrCreateNote(pathTitle);

                await knex("paths").insert({
                    user_id,
                    from_note: pathType === "entry_exit" ? linkedNoteId : noteId,
                    to_note: pathType === "entry_exit" ? noteId : linkedNoteId,
                    path_type: pathType
                });
            }
        };

        // Insert new paths
        if (entry_paths) await insertPaths(entry_paths, "entry_exit");
        if (exit_paths) await insertPaths(exit_paths, "entry_exit");
        if (counter_for) await insertPaths(counter_for, "counter");
        if (can_be_countered_by) await insertPaths(can_be_countered_by, "counter");

        // Fetch the updated note
        const updatedNote = await knex("notes")
            .where("note_id", noteId)
            .select("note_id", "title", "content", "category_id")
            .first();

        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ error: "Failed to update note" });
    }
};

const getAllNoteTitles = async (req, res) => {
    try {
        const noteTitles = await knex("notes").select("note_id", "title");

        res.status(200).json(noteTitles);
    } catch (error) {
        console.error("Error fetching note titles:", error);
        res.status(500).json({ error: "Failed to fetch note titles" });
    }
};


export { getCategories, getNotesByCategory, getNoteDetails, createNote, getCommentsByNote, addCommentToNote, editComment, updatePathsForNote, updateNoteDetails, getAllNoteTitles }