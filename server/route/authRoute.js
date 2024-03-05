const authController = require("../controller/authController");
const { Router } = require("express");

const router = Router();

// router.post("/register", authController.register);
router.get("/todos/:userEmail", authController.getUser);
router.post("/todos", authController.postTodos);
router.put("/todos/id", authController.putTodos);

//Pour l'authentification
router.post("/signup", authController.postInscription);
router.post("/login", authController.postConnexion);

module.exports = router;
