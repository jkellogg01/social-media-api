const Thought = require("../models/Thought");

module.exports = {
  async getThoughts(req, res) {
    try {
      const data = await Thought.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const data = await Thought.find({ _id: req.params.thoughtId });
      if (!data) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async createThought(req, res) {
    try {
      const data = await Thought.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async updateThought(req, res) {
    try {
      const data = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      if (!data) {
        res.status(404).json({ message: "Thought not found" });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err);
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
      res.status(500).send(err);
    }
  },

  async addThoughtReaction(req, res) {
    try {
      const data = await Thought.findOne({ _id: req.params.thoughtId });
      if (!data) {
        res
          .status(400)
          .json({ message: "Thought not found; Create reaction failed." });
        return;
      }
      const reaction = data.reactions.create(req.body);
      if (!reaction) {
        res.status(404).json({ message: "Failed to create reaction" });
        return;
      }
      data.save();
      res.status(201).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async removeThoughtReaction(req, res) {
    try {
      const data = await Thought.findOne({ _id: req.params.thoughtId });
      if (!data) {
        res
          .status(400)
          .json({ message: "Thought not found; Create reaction failed." });
        return;
      }
      data.reactions.pull({ _id: req.params.reactionId });
      data.save();
      res.status(204).json(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
