const { Types, Schema } = require("mongoose");

const reactionFields = {
  reactionId: {
    type: Types.ObjectId,
    default: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

const reactionOpts = {};

const reactionSchema = new Schema(reactionFields, reactionOpts);

module.exports = reactionSchema;
