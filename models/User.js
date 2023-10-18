const { Schema, Types, model } = require("mongoose");

const userFields = {
  username: {
    type: String,
    required: true,
    unique: true,
    trimmed: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // TODO: This does not work
    validate: [isEmail, "invalid email"],
  },
  thoughts: [
    {
      type: Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Types.ObjectId,
      ref: "user",
    },
  ],
};

const userOpts = {
  toJSON: {
    virtuals: true,
  },
};

const userSchema = new Schema(userFields, userOpts);

const User = model("user", userSchema);

User.virtuals("friendCount").get(function () {
  return this.friends.length;
});

module.exports = User;
