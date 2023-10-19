const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addUserFriend,
  removeUserFriend,
} = require("../../controllers/user-controller");

router.get("/", getUsers);

router.post("/", createUser);

router.get("/:userId", getSingleUser);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

router.post("/:userId/friends/:friendId", addUserFriend);

router.delete("/:userId/friends/:friendId", removeUserFriend);

module.exports = router;
