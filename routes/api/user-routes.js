const router = require("express").Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser } = require("../../controllers/user-controller");

router.get("/", getUsers);

router.get("/:userId", getSingleUser);

router.post("/", createUser);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

module.exports = router;
