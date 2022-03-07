const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  getFriends(req, res) {
    User.find()
      .then((friends) => res.json(friends))
      .catch((err) => res.status(500).json(err));
  },
  getSingleFriend(req, res) {
    User.findOne({ _id: req.params.id})
    .select('-__v')
    .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No friend with that ID' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  createFriend(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.updateOne(
      {
        _id: req.params.id
      },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
        }
      },
    )
  },
  deleteUser(req, res) {
    User.deleteOne(
      {
        _id: req.params.id
      }
    )
  },
  deleteFriend(req, res) {
    User.deleteOne(
      {
        _id: req.params.id
      }
    )
  },
};