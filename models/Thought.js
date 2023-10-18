const { Types, Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction.js");

const thoughtFields = {
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: Types.ObjectId,
      ref: "reaction",
    },
  ],
};

const thoughtOpts = {
  toJSON: {
    virtuals: true,
  },
};

const thoughtSchema = new Schema(thoughtFields, thoughtOpts);

const Thought = model("thought", thoughtSchema);

Thought.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = Thought;
