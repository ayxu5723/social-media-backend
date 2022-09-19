const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: getDate
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// Virtual property 'reactionCount' that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Formats the date to locality-sensitive format
function getDate () {
 return this.createdAt.toLocaleString();
}


const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;
