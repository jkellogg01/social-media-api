const router = require("express").Router();
const user = require("./user-routes");
const thought = require("./thought-routes");

router.use("/user", user);
router.use("/thought", thought);

module.exports = router;
