const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  // deleteThought,
  // updateThought,
  // addReaction,
  // removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  // .put(updateThought)
  // .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions 
// router.route('/:thoughtId/reactions').get(getSingleThought).post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId 
// router.route('/:thoughtId/reactions/:reactionId').get(getSingleThought).delete(removeReaction);

module.exports = router;