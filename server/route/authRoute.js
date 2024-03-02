const authController = require("../controller/authController");
const { Router } = require("express");

const router = Router();

// router.post("/register", authController.register);
router.get("/todos", authController.getUser);

module.exports = router;
