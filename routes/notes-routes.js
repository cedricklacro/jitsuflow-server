import express from 'express';
import { getCategories, getNotesByCategory, getNoteDetails, createNote, getCommentsByNote, addCommentToNote, editComment, updatePathsForNote, updateNoteDetails, getAllNoteTitles } from '../controllers/notes-controller.js';

const router = express.Router();

router.route('/')
    .post(createNote);

router.route('/titles')
    .get(getAllNoteTitles);

router.route('/categories')
    .get(getCategories);

router.route('/category/:categoryId')
    .get(getNotesByCategory);

router.route('/:noteId')
    .get(getNoteDetails)
    .put(updateNoteDetails);

router.route('/:noteId/paths')
    .put(updatePathsForNote);

router.route('/:noteId/comments')
    .get(getCommentsByNote)
    .post(addCommentToNote);

router.route('/:noteId/comments/:commentId')
    .put(editComment);

export default router;