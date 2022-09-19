const { User, Thoughts } = require('../models');

const headCount = async () => 
  User.aggregate().count('numberOfUsers')
  .then((numberOfUsers) => numberOfUsers);


const getUsers = (req, res) => {

    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        res.status(500).json(err);
      }); 
  }

const getSingleUser = (req, res) => {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
};

  // create a new user
const createUser = (req, res) => {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
};

const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new:true }
    )
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
};


const deleteUser = (req, res) => {
  User.findOneAndRemove({ _id:req.params.userId })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
};

const addFriend = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: {friends: req.params.friendId } },
    { runValidators: true, new: true}
    )

    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
};

const removeFriend = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: {friends: req.params.friendId } },
    { runValidators: true, new: true}
    )
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
};

  module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  };