const { Schema, Types } = require('mongoose');


// Schema to create Reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: getDate,
    },


  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

function getDate () {
  return this.createdAt.toDateString();
}

module.exports = reactionSchema;
