const { Schema, Types, model } = require("mongoose");

const isEmail =
  /([\w!#$%&'*+\/=?^_`{|}~-]+(?:\.[\w!#$%&'*+\/=?^_`{|}~-]+)*)@([\w](?:[\w-]*[\w])?\.)+([\w](?:[\w-]*[\w])?)/;

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
    match: isEmail,
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

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
