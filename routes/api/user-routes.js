// Express router is required
const router = require('express').Router();

// The requirements from our users controllers
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
  } = require('../../controllers/users-controller');

// directs us to get and post within our api users
router.route('/').get(getAllUsers).post(createUsers);

// directs us to get put and delete within our api users id
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// directs us to post and delete within our api users userid friendid
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

// exporting module router
module.exports = router; 