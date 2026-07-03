const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {registerUser, loginUser, getMe, logoutUser,} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

//get current user
router.get("/me", protect, getMe);

module.exports = router;