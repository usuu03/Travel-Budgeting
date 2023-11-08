const express = require("express");
const UserController = require("../controller/userController");

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/register", UserController.register);

router.post("/login", UserController.login); // Fix the function name here

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.exports = router;
