const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought
} = require("../../controllers/thought-controller");

router.get("/", getThoughts);

router.get("/:thoughtId", getSingleThought);

router.post("/", createThought);

router.put("/:thoughtId", updateThought);

router.delete("/:thoughtId", deleteThought);

module.exports = router;
