const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  getReactions,
  createReaction,
  getReaction,
  deleteReaction,
} = require('../../controllers/userController');

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .get(getReactions)
    .post(createReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .get(getReaction)
    .delete(deleteReaction);

module.exports = router;