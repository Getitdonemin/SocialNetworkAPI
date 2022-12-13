// Express router is required
const router = require('express').Router();

// all functions needed from our user controller
const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughts-controller');

// this will direct us to our <GET> /api/thoughts
router.route('/').get(getAllThoughts);

// this will direct us to our get,put, and delete 
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

// this will direct us to post
router.route('/:userId').post(createThoughts);

// same as ^^ but in our reactions
router.route('/:thoughtId/reactions').post(addReaction);

// this will direct us to delete
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Exporting our module router
module.exports = router;