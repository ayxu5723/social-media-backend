const { User, Thoughts } = require('../models');

// Get all thoughts
const getThoughts = (req, res) => {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
};

// Get a single thought
const getSingleThought = (req, res) => {
  Thoughts.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  };

// create a new thought
const createThought = (req, res) => {
  Thoughts.create({...req.body, createdAt: new Date() })
    .then((thought) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: {thoughts: thought._id} },
        { new: true }
      );
    })
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No user with this ID'})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};

// Update a single thought
const updateThought = (req, res) => {
  Thoughts.findOneAndUpdate(        
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought  
          ? res.status(404).json({message: 'No thoughts with this ID'})
          : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};

// Delete a thought
const deleteThought = (req, res) => {
  Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thoughts with this ID' })
        : User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        )
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this ID' })
        : res.json({ message: 'Thought successfully deleted!' })
    )
    .catch((err) => res.status(500).json(500))
}

const addReaction = (req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: { ...req.body, createdAt: (new Date())} } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thoughts found with this ID' })
        : res.json(thought)
    )
      .catch((err) => res.status(500).json(err))
}

const removeReaction = (req, res) => {
  Thoughts.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
  .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'No thought found with this ID' })
      : res.json(thought)
  )
  .catch((err) => res.status(500).json(err))
}

module.exports = { 
  getThoughts, 
  getSingleThought, 
  createThought, 
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
};