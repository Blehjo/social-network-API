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
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id:req.params.thoughtId},
      {$addToSet:{reactions:req.body}},
      {runValidators:true, new:true}
    )
    .then((thought)=>
      !thought
          ? res
              .status(404)
              .json({message:'No thought found with that id'})
          : res.json(thought)
    )
    .catch((err)=>{
      console.log(err)
      res.status(500).json(err);
    })
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
    Thought.findOneAndUpdate(
      { _id:req.params.thoughtId},
      {$pull: {reactions:{reactionId:req.params.reactionId}}},
      {runValidators:true, new:true}
    )
    .then((thought)=>
      !thought
          ?res
              .status(404)
              .json({message:'No thought found with that id'})
          :res.json({message:'delete reaction'})   
    )
    .catch((err)=>{
      console.log(err)
      res.status(500).json(err);
    })
  },
};