const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const data = await User.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const data = await User.find(
        { _id: req.params.userId },
        { select: "-__v" }
      );
      if (!data) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const data = await User.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
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
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const data = await User.delete({ _id: req.body.userId });
      if (!data) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
