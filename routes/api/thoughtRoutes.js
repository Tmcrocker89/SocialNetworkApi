const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createThoughtReaction,
  deleteThoughtReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route(`/:thoughtId/reactions`).put(createThoughtReaction)

router.route(`/:thoughtId/reactions/:reactionId`).put(deleteThoughtReaction)

module.exports = router;