const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getFriends,
  createFriend,
  getFriend,
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
    .get(getFriends)
    .post(createFriend).

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .get(getFriend)
    .delete(deleteFriend);

module.exports = router;