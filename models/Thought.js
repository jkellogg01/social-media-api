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
    get: function formatDate() {
      return this.toUTCString();
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
};

const thoughtOpts = {
  toJSON: {
    virtuals: true,
  },
};

const thoughtSchema = new Schema(thoughtFields, thoughtOpts);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
