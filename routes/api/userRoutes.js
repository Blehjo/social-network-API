const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  createFriend,
  updateUser,
  deleteUser,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends
router
    .route('/:userId/friends/')
    .post(createFriend);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .delete(deleteFriend);

module.exports = router;