const { Types, Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

/*
**Thought**:

* `thoughtText`
  * String
  * Required
  * Must be between 1 and 280 characters

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

* `username` (The user that created this thought)
  * String
  * Required

* `reactions` (These are like replies)
  * Array of nested documents created with the `reactionSchema`

**Schema Settings**:

Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
*/

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
  reactions: [{
    type: Types.ObjectId,
    ref: 'reaction'
  }],
};

const thoughtOpts = {
  toJSON: {
    virtuals: true,
  }
};

const thoughtSchema = new Schema(thoughtFields, thoughtOpts);

const Thought = model("thought", thoughtSchema);

Thought.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = Thought
