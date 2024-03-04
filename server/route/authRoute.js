const authController = require("../controller/authController");
const { Router } = require("express");

const router = Router();

// router.post("/register", authController.register);
router.get("/todos/:userEmail", authController.getUser);
router.post("/todos", authController.postTodos);
router.put("/todos/id", authController.putTodos);

module.exports = router;
