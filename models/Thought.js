const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },


  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID exists' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought')
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id found!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID found' })
          : User.deleteMany({ _id: { $in: thought.username } })
      )
      .then(() => res.json({ message: 'Thought and user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  
  //Create reaction in thought
  createThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {  $addToSet: { reactions: reaction._id } },
      { new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  }

};