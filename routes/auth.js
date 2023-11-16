const express = require("express");
const validateBody = require("../middlewares/validateBody");
const { schemas } = require("../models/users");
const {
  register,
  login,
  getCurrent,
  logout,
  verifyEmail,
  resendVerifyEmail,
} = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateBody(schemas.emailSchema), resendVerifyEmail);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);

module.exports = router;
