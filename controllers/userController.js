const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
      User.find()
        .then(async (users) => {
          const userObj = {
            users
          };
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // // Get a single user
    getSingleUser(req, res) {
      console.log(req.params)
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user,
                // grade: await grade(req.params.userId),
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // // Delete a user and remove their thoughts
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : Thought.findOneAndUpdate(
              { username: req.params.username },
              { $pull: { username: req.params.username } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
    updateUser(req, res) {
      console.log(req.body)
      const filter = {_id: req.params.userId};
      const update = { username: req.body.username, email: req.body.email}
      User.findOneAndUpdate(filter, update,{ returnOriginal: false})
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No such user exists' })
            : res.status(200).json({ message: `User ${user} Updated` })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    addSingleFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove a friend from a user
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

  };
  