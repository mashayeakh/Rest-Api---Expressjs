const express = require("express");
const { createUser, findUser, updateUser, deleteUser } = require("./UserHandlers");

const router = express.Router();

router.post("/", createUser);
router.get("/", findUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;
