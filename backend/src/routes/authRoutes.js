
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */


const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
