const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction,
} = require("../../controllers/thought-controller");

router.get("/", getThoughts);

router.get("/:thoughtId", getSingleThought);

router.post("/", createThought);

router.put("/:thoughtId", updateThought);

router.delete("/:thoughtId", deleteThought);

router.post("/:thoughtId/reactions", addThoughtReaction);

router.delete("/:thoughtId/reactions/:reactionId", removeThoughtReaction);

module.exports = router;
