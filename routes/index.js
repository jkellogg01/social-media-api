const router = require("express").Router();
const api = require("./api");

// middleware for logging the nature of requests
router.use((req, res, next) => {
  console.info(`method ${req.method} on path ${req.path}`);
  res.status(100);
  next();
});

router.use("/api", api);

module.exports = router;
