const Thought = require('../models/Thought');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  getReactions(req, res) {
    Thought.find()
      .then((reactions) => res.json(reactions))
      .catch((err) => res.status(500).json(err));
  },
  getSingleReaction(req, res) {
    Thought.findOne({ _id: req.params.reactionId})
    .select('-__v')
    .then((friend) =>
        !friend
          ? res.status(404).json({ message: 'No friend with that ID' })
          : res.json(friend)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.updateOne(
      {
        _id: req.params.thoughtId
      },
      {
        $set: req.body
      },
    )
  },
  deleteThought(req, res) {
    Thought.deleteOne(
      {
        _id: req.params.thoughtId
      }
    )
  },
  deleteReaction(req, res) {
    Thought.deleteOne(
      {
        _id: req.params.reactionId
      }
    )
  },
};