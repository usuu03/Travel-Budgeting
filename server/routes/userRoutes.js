const express = require("express");
const UserController = require("../controller/userController");

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loggingUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

module.export = router;
