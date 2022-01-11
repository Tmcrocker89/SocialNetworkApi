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
        !thought
          ? res.status(404).json({message: 'Couldnt create thought'})
          : User.findOneAndUpdate(
            {userId: req.body.userId},
            {$push: {thoughts: thought.id}},
          )
          .then((user) => 

              !user
                ? res.status(404).json({ message: 'No user found with that id'})
                : res.json(thought)
          )
        })
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
    console.log('init delete thought')
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that id exists' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )
      )
      .then((user) =>
        !user
          ? user.status(404).json({
              message: 'Thought deleted, but no user found',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )      
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
  },

  
  //Create reaction in thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $addToSet: {reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  //Delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { thoughtId: req.params.thoughtId },
      { $pull: {reactions: {reactionId: req.params.reactionId}} },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        const response = !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  }, 

};