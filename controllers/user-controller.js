const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const data = await User.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const data = await User.find({ _id: req.params.userId }).populate([
        "thoughts",
        "friends",
      ]);
      if (!data) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async createUser(req, res) {
    try {
      const data = await User.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async updateUser(req, res) {
    try {
      const data = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      if (!data) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const data = await User.delete({ _id: req.params.userId });
      if (!data) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async addUserFriend(req, res) {
    try {
      const data = await User.findOne({ _id: req.params.userId });
      if (!data) {
        res
          .status(404)
          .json({ message: "could not find the user to add this friend to" });
        return;
      }
      data.friends.push(req.params.friendId);
      data.save();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async removeUserFriend(req, res) {
    try {
      const data = await User.findOne({ _id: req.params.userId });
      if (!data) {
        res
          .status(404)
          .json({ message: "could not find the user to add this friend to" });
        return;
      }
      data.friends.pull(req.params.friendId);
      data.save();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
