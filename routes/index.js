const router = require('express').Router();
const api = require('./api');

router.use("/api", api);

router.use("*", async (req, res) => {
  res.status(404).json({
    heading: "Here be dragons",
    message: "Please use the /api route for querying the api!",
  });
  return console.warn("Invalid API endpoint");
});

module.exports = router;
