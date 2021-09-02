const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/register", authController.register);
router.get("/login/:id", authController.login);

module.exports = router;
