const { Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const data = await Thought.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const data = await Thought.find(
        { _id: req.params.thoughtId },
        { select: "-__v" },
      );
      if (!data) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const data = await Thought.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const data = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true },
      );
      if (!data) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const data = await Thought.delete({ _id: req.body.thoughtId });
      if (!data) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
